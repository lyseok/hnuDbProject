from database import Base
from sqlalchemy import create_engine, Column, Date, Boolean,MetaData, Table, Integer, String, ForeignKey


class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key = True, index = True)
    name = Column(String(100))
    phone_number = Column(String(100))
    email = Column(String(100), unique = True)
    hashed_password = Column(String(100))

class Bookinfo(Base):
    __tablename__ = 'bookinfo'
    book_id = Column(Integer, primary_key = True, index = True)
    title = Column(String(100))
    author = Column(String(100))
    publisher = Column(String(100))
    genre = Column(String(100))
    isbn = Column(Integer, unique = True)

class Inventory(Base):
    __tablename__ = 'inventory'
    inventory_id = Column(Integer, primary_key = True)
    book_id = Column(Integer, ForeignKey('bookinfo.book_id'))
    quantity = Column(Integer)

class Rental(Base):
    __tablename__ = 'rental'
    rental_id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('user.user_id'))
    book_id = Column(Integer, ForeignKey('bookinfo.book_id'))
    status = Column(Boolean)
    rental_date = Column(Date)
    return_date = Column(Date)