'use client'

import React, { useState } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import Avatar from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import styles from './home.module.css'

// Definición de tipos
type Comment = {
  id: number
  username: string
  text: string
}

type Post = {
  id: number
  username: string
  imageUrl: string
  likes: number
  liked?: boolean
  comments: Comment[]
}

// Componente para un solo post
const PostCard: React.FC<{ post: Post, onLike: () => void, onComment: (text: string) => void }> = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      onComment(commentText)
      setCommentText('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <Avatar nombre={post.username} />
        <span>{post.username}</span>
      </CardHeader>
      <CardContent>
        <img src={post.imageUrl} alt="Post" />
      </CardContent>

      <CardFooter>
        <div className={styles.cardFooter_likeSection}>
          <Button onClick={onLike}>
            <Heart className={post.liked ? `${styles.cardFooter_liked}` : ""} />
          </Button>
          <span>{post.likes} likes</span>
        </div>

        <div className={styles.cardFooter_commentsSection}>
          {post.comments.map((comment) => (
            <p key={comment.id}>
              <span>{comment.username}:</span> {comment.text}
            </p>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className={styles.cardFooter_commentForm}>
          <Input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={styles.cardFooter_commentInput}
          />
          <Button type="submit" size="icon">
            <Send className={styles.sendBtn} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

// Componente principal
const InstagramClone = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "Jane Doe",
      imageUrl: "https://img.freepik.com/foto-gratis/paisaje-forestal_71767-127.jpg",
      likes: 10,
      liked: false,
      comments: [{ id: 1, username: "user2", text: "Great photo!" }]
    },
    {
      id: 2,
      username: "Andres Perez",
      imageUrl: "https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg",
      likes: 15,
      liked: false,
      comments: []
    },
    {
      id: 3,
      username: "Juan Perez",
      imageUrl: "https://cc-prod.scene7.com/is/image/CCProdAuthor/7%20AdobeStock_335413355?$png$&jpegSize=200&wid=960",
      likes: 0,
      liked: false,
      comments: [{ id: 1, username: "user1", text: "Nice shot!" }]
    }
  ])

  const [newPost, setNewPost] = useState({ username: '', imageUrl: '' })

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } 
        : post
    ));
  };

  const handleComment = (postId: number, text: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...post.comments, { id: post.comments.length + 1, username: "currentUser", text }] 
      } : post
    ))
  }

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.imageUrl.trim()) {
      const newPostData: Post = {
        id: posts.length + 1,
        username: newPost.username,
        imageUrl: newPost.imageUrl,
        likes: 0,
        liked: false,
        comments: []
      }
      setPosts([newPostData, ...posts])
      setNewPost({ username: '', imageUrl: '' })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgGradient}></div>
      <h1>Aventura Digital</h1>

      <form onSubmit={handleAddPost}>
        <Input 
          type="text" 
          placeholder="Image URL" 
          value={newPost.imageUrl} 
          onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })} 
        />
        <Button type="submit">Add Post</Button>
      </form>

      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={() => handleLike(post.id)} 
          onComment={(text) => handleComment(post.id, text)} 
        />
      ))}
    </div>
  )
}

export default InstagramClone