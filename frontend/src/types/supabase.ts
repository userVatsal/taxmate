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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          tax_year_start: string | null
          tax_year_end: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          tax_year_start?: string | null
          tax_year_end?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          tax_year_start?: string | null
          tax_year_end?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          description: string
          amount: number
          type: 'income' | 'expense'
          category: string
          date: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          description: string
          amount: number
          type: 'income' | 'expense'
          category: string
          date: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          description?: string
          amount?: number
          type?: 'income' | 'expense'
          category?: string
          date?: string
          metadata?: Json | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          type: 'income' | 'expense'
          color: string
          icon: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          type: 'income' | 'expense'
          color: string
          icon?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          type?: 'income' | 'expense'
          color?: string
          icon?: string | null
        }
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
  }
} 