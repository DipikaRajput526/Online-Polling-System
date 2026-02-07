from django.urls import path
from .views import CastVoteView, VoteHistoryView, VoteReceiptView

urlpatterns = [
    path('cast', CastVoteView.as_view(), name='cast-vote'),
    path('history', VoteHistoryView.as_view(), name='vote-history'),
    path('receipt/<str:receipt_id>', VoteReceiptView.as_view(), name='vote-receipt'),
]
