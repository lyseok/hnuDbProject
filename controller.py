from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from models import User, Bookinfo, Inventory, Rental
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession 
from dependencies import get_db, get_password_hash, verify_password

router = APIRouter()
templates = Jinja2Templates(directory='templates')

@router.get('/')
async def read_root(request : Request):
    return templates.TemplateResponse('index.html', {"request" : request})

@router.get('/login')
async def loginpage(request : Request):
    return templates.TemplateResponse('login.html', {"request" : request})

@router.get('/cart')
async def cartpage(request:Request):
    return templates.TemplateResponse('cart.html', {"request" : request})

@router.get('/wish')
async def wishpage(request:Request):
    return templates.TemplateResponse('wishlist.html', {"request" : request})

