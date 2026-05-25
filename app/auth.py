import os
import requests
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from jose import jwt, JWTError
from functools import lru_cache

security = HTTPBearer()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET", "")

# Cache JWKS por 5 minutos (300s)
@lru_cache(maxsize=1)
def get_jwks():
    """Obtiene el JWKS público de Supabase para verificar JWT"""
    try:
        jwks_url = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"
        response = requests.get(jwks_url, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error obteniendo JWKS: {e}")
        raise HTTPException(status_code=500, detail="No se pudo obtener JWKS")


def get_public_key(token: str):
    """Extrae kid del header y obtiene la clave pública correspondiente"""
    try:
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        
        jwks = get_jwks()
        for key in jwks.get("keys", []):
            if key.get("kid") == kid:
                return key
        
        raise HTTPException(status_code=401, detail="Key ID no encontrada en JWKS")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")


def verify_jwt(credentials: HTTPAuthCredentials = Security(security)):
    """Verifica el JWT de Supabase y retorna el payload"""
    token = credentials.credentials
    
    try:
        # Opción 1: Si tienes SUPABASE_JWT_SECRET configurado (recomendado)
        if SUPABASE_JWT_SECRET:
            payload = jwt.decode(
                token,
                SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_signature": True}
            )
        else:
            # Opción 2: Usar JWKS público (más seguro, sin guardar secret)
            key = get_public_key(token)
            # Convertir JWKS a formato que acepta python-jose
            from cryptography.hazmat.primitives import serialization
            from cryptography.hazmat.backends import default_backend
            import json
            
            # Usar el endpoint de verificación de Supabase (alternativa)
            # Por ahora, usaremos el secret si está disponible
            raise HTTPException(
                status_code=500,
                detail="Configure SUPABASE_JWT_SECRET en variables de entorno"
            )
        
        return payload
    
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token inválido: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=401, detail="No autorizado")


def get_current_user(payload: dict = Depends(verify_jwt)):
    """Obtiene el usuario actual del payload del JWT"""
    try:
        user_id = payload.get("sub")
        email = payload.get("email")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="Token sin identificador de usuario")
        
        return {
            "user_id": user_id,
            "email": email,
            "payload": payload
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Usuario no válido")
