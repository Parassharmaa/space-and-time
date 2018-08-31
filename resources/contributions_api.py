from flask_restful import Resource, reqparse
from flask import request
from models import Contribution, MapEvents
from common import wrap_data
from auth import requires_auth, requires_auth_admin
from common import parse_jwt


class AddContribution(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('edit_id', type=str)
        self.parser.add_argument('title', type=str)
        self.parser.add_argument('year', type=int)
        self.parser.add_argument('description', type=str)
        self.parser.add_argument('plot', action="append")

    @requires_auth
    def post(self, title_id):
        try:
            args = self.parser.parse_args()
            edit_id = args['edit_id']
            title = args['title']
            year = args['year']
            description = args['description']
            plot = args['plot']
            user = parse_jwt(request.headers['Authorization'])
            print(args)
            m = Contribution(
                title_id=title_id,
                title=title,
                year=year,
                email=user['email'],
                description=description,
                plot=plot,
                edit_id=edit_id)
            m.save()
            return {"message": "Saved successfuly"}, 200
        except Exception as e:
            print(e)
            return {"message": "An error occured"}, 401


class ListContribution(Resource):
    @requires_auth_admin
    def get(self, title_id):
        try:
            data = Contribution.objects(title_id=title_id, is_reviewed=False, is_deleted=False)
            return wrap_data(data), 200
        except Exception as e:
            return {"message": "An error occured"}, 401


class ReviewContribution(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('contribution_id', type=str)
        self.parser.add_argument('review', type=bool)
        self.parser.add_argument('delete', type=bool)

    @requires_auth_admin
    def post(self, title_id):
        try:
            args = self.parser.parse_args()
            contribution_id = args['contribution_id']
            review = args['review']
            delete = args['delete']
            print(args)
            c = Contribution.objects(id=contribution_id).first()
            c.update(title=title_id, is_reviewed=review, is_deleted=delete)
            
            if review:
                m = MapEvents.objects(id=c.edit_id).first()
                m.update(title=c.title, description=c.description, year=c.year)
                m.reload()
            c.reload()

            return {'message': 'Reviewed'}, 200
        except Exception as e:
            print(e)
            return {"message": "An error occured"}, 401
