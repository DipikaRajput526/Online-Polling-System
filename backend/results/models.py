from django.db import models
from django.db.models import Count
from polls.models import Poll, Candidate


class Result(models.Model):
    """Result model for storing poll results"""
    
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='results')
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='results')
    vote_count = models.IntegerField(default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    is_winner = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'results'
        ordering = ['-vote_count']
        unique_together = [['poll', 'candidate']]
    
    def __str__(self):
        return f"{self.candidate.name} - {self.vote_count} votes ({self.percentage}%)"
    
    @staticmethod
    def calculate_results(poll):
        """Calculate and update results for a poll"""
        from voting.models import Vote
        from django.utils import timezone
        
        # Get vote counts for each candidate
        vote_counts = Vote.objects.filter(poll=poll).values('candidate').annotate(
            count=Count('id')
        )
        
        # Get total votes
        total_votes = Vote.objects.filter(poll=poll).count()
        
        # Clear existing results
        Result.objects.filter(poll=poll).delete()
        
        # Create new results
        results = []
        max_votes = 0
        
        for vote_data in vote_counts:
            candidate = Candidate.objects.get(id=vote_data['candidate'])
            vote_count = vote_data['count']
            percentage = (vote_count / total_votes * 100) if total_votes > 0 else 0
            
            result = Result(
                poll=poll,
                candidate=candidate,
                vote_count=vote_count,
                percentage=round(percentage, 2)
            )
            results.append(result)
            
            if vote_count > max_votes:
                max_votes = vote_count
        
        # Mark winners (handle ties)
        for result in results:
            if result.vote_count == max_votes and max_votes > 0:
                result.is_winner = True
        
        # Bulk create results
        Result.objects.bulk_create(results)
        
        return results
