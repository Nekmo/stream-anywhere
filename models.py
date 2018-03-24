import os
from sqlalchemy import create_engine, Integer, Column, String, DateTime, func, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import JSONType

STREAM_ANYWHERE_FILE = os.environ.get('STREAM_ANYWHERE_FILE', os.path.expanduser(
    '~/.local/var/lib/stream-anywhere/db.sqlite3'))
STREAM_ANYWHERE_DB_URL = os.environ.get('STREAM_ANYWHERE_DB_URL', 'sqlite:///{}'.format(STREAM_ANYWHERE_FILE))


Base = declarative_base()


class Video(Base):
    __tablename__ = 'videos'

    id = Column(Integer, Sequence('video_id_seq'), primary_key=True)
    url = Column(String(4500), index=True)
    position = Column(Integer, default=0)
    options = Column(JSONType)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def json(self):
        return {
            'id': self.id,
            'url': self.url,
            'position': self.position,
        }


proxy_db_dir = os.path.dirname(STREAM_ANYWHERE_FILE)
if not os.path.lexists(proxy_db_dir):
    os.makedirs(proxy_db_dir)

engine = create_engine(
    STREAM_ANYWHERE_DB_URL,
    connect_args={'check_same_thread': False} if STREAM_ANYWHERE_DB_URL.startswith('sqlite://') else {}
)
Base.metadata.create_all(engine)


def create_session_maker():
    return sessionmaker(bind=engine)


session_maker = create_session_maker()


def create_session():
    return session_maker()
