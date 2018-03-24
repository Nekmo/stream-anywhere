from flask import Flask, url_for, send_from_directory, request
from flask_restful import Api, Resource, reqparse, abort

from db import get_or_create
from models import create_session, Video

app = Flask(__name__)


@app.route('/')
def hello_world():
    return send_from_directory('static/stream-anywhere/src', 'index.html')


api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('url')


class VideoApi(Resource):
    def get_object(self, video_id, session=None):
        session = session or create_session()
        video, exists = get_or_create(session, Video, id=int(video_id))
        if not exists:
            abort(404)
        return video

    def get(self, video_id):
        return self.get_object(video_id).json()

    def patch(self, video_id):
        session = create_session()
        video = self.get_object(video_id, session)
        for key, value in request.json.items():
            setattr(video, key, value)
        session.commit()


class VideoListApi(Resource):
    def get(self):
        session = create_session()
        items = session.query(Video).order_by(Video.updated_at.desc()).limit(10)
        return [item.json() for item in items]

    def post(self):
        args = parser.parse_args()
        session = create_session()
        video, exists = get_or_create(session, Video, url=args.url)
        if not exists:
            session.commit()
        return dict(is_new=not exists, **video.json())


api.add_resource(VideoListApi, '/api/videos')
api.add_resource(VideoApi, '/api/videos/<video_id>')


if __name__ == '__main__':
    app.run(debug=True)
