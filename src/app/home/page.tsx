'use client'

import React, { useEffect, useState } from 'react'
import { Heart, Send, Plus, CircleX, LogOut, Divide } from 'lucide-react'
import Avatar from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import styles from './home.module.css'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useRouter } from 'next/navigation';

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
    <div className={styles.cardContainer_anim}>

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
    </div>
  )
}

// Componente principal
const InstagramClone = () => {
  const [showModal, setShowModal] = useState(false)

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

  const [newPost, setNewPost] = useState({ comment: '', imageUrl: '' });
  const [userName, setUserName] = useState('Cool User');
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

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
        comments: [...post.comments, { id: post.comments.length + 1, username: userName, text }]
      } : post
    ))
  }

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.imageUrl.trim()) {
      const newPostData: Post = {
        id: posts.length + 1,
        username: userName,
        imageUrl: newPost.imageUrl,
        likes: 0,
        liked: false,
        comments: [{ id: posts.length + 1, username: userName, text: newPost.comment }]
      }
      handleComment(newPostData.id, 'First comment')
      setPosts([newPostData, ...posts])
      setNewPost({ comment: '', imageUrl: '' })
    }
  }

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      setFirebaseUser(null);
      router.push('/'); // Asegúrate de redirigir después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bgGradient}></div>
      <h1>Aventura Digital</h1>

      {firebaseUser && (
        <div>active</div>)}

      {!firebaseUser && (
        <div>no active</div>)}

      <Button onClick={() => setShowModal(true)} classname={styles.addPostbtn}>
        <Plus />
      </Button>

      <Button onClick={handleLogOut} classname={styles.logOutBtn}>
        Salir <LogOut />
      </Button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Button classname={styles.closeBtn} onClick={() => setShowModal(false)}>
              <CircleX className={styles.closebtnicon} />
            </Button>
            <form onSubmit={handleAddPost} className={styles.modalForm}>
              <p>URL de tu imagen</p>
              <Input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
              />

              <p>Añade un comentario</p>
              <Input
                type='text'
                placeholder='Nice shot!'
                value={newPost.comment}
                onChange={(e) => setNewPost({ ...newPost, comment: e.target.value })}
              />

              <Button classname={styles.addPostBtn} type="submit">Add Post</Button>
            </form>
          </div>
        </div>
      )}

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