import { useState } from "react";
import { MessageCircle, Star, ThumbsUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CommentsSectionProps {
  propertyId: string;
}

const CommentsSection = ({ propertyId }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");

  // Mock comments data
  const comments = [
    {
      id: "1",
      author: "Sarah Johnson",
      initials: "SJ",
      date: "2 days ago",
      rating: 5,
      content: "Absolutely stunning property! The views are incredible and the modern design is exactly what we were looking for. The neighborhood is quiet and family-friendly.",
      helpful: 12,
      verified: true
    },
    {
      id: "2",
      author: "Michael Chen",
      initials: "MC",
      date: "1 week ago",
      rating: 4,
      content: "Great property overall. The location is fantastic and the amenities are top-notch. Only minor concern is the parking situation during peak hours.",
      helpful: 8,
      verified: false
    },
    {
      id: "3",
      author: "Emily Rodriguez",
      initials: "ER",
      date: "2 weeks ago",
      rating: 5,
      content: "This home exceeded our expectations! The photos don't do justice to how spacious and bright it is. The kitchen is a chef's dream and the master suite is incredibly luxurious.",
      helpful: 15,
      verified: true
    }
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // For now, just clear the textarea
      // In a real app, this would submit to the backend
      setNewComment("");
    }
  };

  const averageRating = comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Reviews & Comments</h2>
          <Badge variant="secondary" className="ml-3">
            {comments.length} reviews
          </Badge>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      {/* Add Comment Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Leave a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-sm text-muted-foreground mr-2">Your rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                />
              ))}
            </div>
            <Textarea
              placeholder="Share your thoughts about this property..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                For backend functionality like saving comments, you'll need to connect Supabase
              </p>
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                Post Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>{comment.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{comment.author}</h4>
                      {comment.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{comment.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({comment.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;