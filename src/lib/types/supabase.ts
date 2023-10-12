export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Profile: {
        Row: {
          email: string
          id: string
          image: string | null
          isPro: boolean
          name: string
          usersId: string

        }
        Insert: {
          email: string
          id: string
          image?: string | null
          isPro?: boolean
          name: string
          usersId: string
        }
        Update: {
          email?: string
          id?: string
          image?: string | null
          isPro?: boolean
          name?: string
          usersId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Profile_usersId_fkey"
            columns: ["usersId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
