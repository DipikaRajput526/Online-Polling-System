from django.urls import path
from .views import LiveResultsView, FinalResultsView, PollResultsView, PublishResultsView

urlpatterns = [
    path('live', LiveResultsView.as_view(), name='live-results'),
    path('final', FinalResultsView.as_view(), name='final-results'),
    path('poll/<int:poll_id>', PollResultsView.as_view(), name='poll-results'),
    path('publish', PublishResultsView.as_view(), name='publish-results'),
]
