from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
import datetime as dt

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    rating = Column(Integer)
    post_date = Column(DateTime, default=dt.datetime.now)