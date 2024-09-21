import { createContext, useState } from "react"

export interface Comment {
  id: string
  name: string
  comment: string
}

interface CommentContextType {
  comments: Comment[]
  getComments: () => void
  createComment: (address: Comment) => void
  updateComment: (address: Comment) => void
  deleteComment: (id: string) => void
}

export const CommentContext = createContext({} as CommentContextType)

interface CommentProviderProps {
  children: React.ReactNode
}

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const [comments, setComment] = useState<Comment[]>([
    {
      id: '81',
      name: 'Fernando',
      comment: 'Amo sempre que vou ai amigo :D'
    }
  ])

  const getComments = async () => {
    return comments
  }

  const createComment = async (comment: Comment) => {
    const id = Math.round(Math.random() * 100);
    comment.id = id.toString();
    setComment([...comments, comment]);
  }

  const updateComment = async (comment: Comment) => {
    const index = comments.findIndex((data) => data.id === comment.id);
    comments[index] = comment;
    setComment([...comments]);
  }

  const deleteComment = async (id: string) => {
    const result = comments.filter((data) => data.id !== id);
    setComment(result);
  }

  return (
    <CommentContext.Provider value={{ comments, getComments, createComment, updateComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  )
}