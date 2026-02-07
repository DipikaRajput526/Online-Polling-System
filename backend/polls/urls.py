from django.urls import path
from .views import (
    PollListView, PollDetailView, PollCreateView, PollUpdateView,
    PollDeleteView, PollPublishView, CandidateAddView, CandidateRemoveView
)

urlpatterns = [
    # Poll management
    path('', PollListView.as_view(), name='poll-list'),
    path('<int:pk>', PollDetailView.as_view(), name='poll-detail'),
    path('create', PollCreateView.as_view(), name='poll-create'),
    path('<int:poll_id>/update', PollUpdateView.as_view(), name='poll-update'),
    path('<int:poll_id>/delete', PollDeleteView.as_view(), name='poll-delete'),
    path('<int:poll_id>/publish', PollPublishView.as_view(), name='poll-publish'),
    
    # Candidate management
    path('<int:poll_id>/candidates/add', CandidateAddView.as_view(), name='candidate-add'),
    path('candidates/<int:candidate_id>/remove', CandidateRemoveView.as_view(), name='candidate-remove'),
]
