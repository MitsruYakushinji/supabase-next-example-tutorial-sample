// GENERATED CODE -- DO NOT EDIT!
export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export interface Database {
  deleted: {
    Tables: {
      projects: {
        Row: {
          created_by: string;
          deleted_at: string;
          description: string | null;
          id: string;
          inserted_at: string;
          name: string;
          slug: string;
          template_id: string;
        };
        Insert: {
          created_by: string;
          deleted_at?: string;
          description?: string | null;
          id: string;
          inserted_at: string;
          name: string;
          slug: string;
          template_id: string;
        };
        Update: {
          created_by?: string;
          deleted_at?: string;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          name?: string;
          slug?: string;
          template_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  pgbouncer: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_auth: {
        Args: {
          p_usename: string;
        };
        Returns: {
          username: string;
          password: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      component_tags: {
        Row: {
          component_id: string;
          tag_id: number;
        };
        Insert: {
          component_id: string;
          tag_id: number;
        };
        Update: {
          component_id?: string;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'component_tags_component_id_fkey';
            columns: ['component_id'];
            referencedRelation: 'components';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'component_tags_tag_id_fkey';
            columns: ['tag_id'];
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      component_types: {
        Row: {
          description: string | null;
          id: number;
          inserted_at: string;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          inserted_at?: string;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          inserted_at?: string;
          name?: string;
        };
        Relationships: [];
      };
      components: {
        Row: {
          component_type_id: number;
          created_by: string;
          description: string | null;
          has_image: boolean;
          id: string;
          inserted_at: string;
          linked: boolean;
          name: string;
          updated_at: string;
        };
        Insert: {
          component_type_id: number;
          created_by: string;
          description?: string | null;
          has_image?: boolean;
          id?: string;
          inserted_at?: string;
          linked?: boolean;
          name: string;
          updated_at?: string;
        };
        Update: {
          component_type_id?: number;
          created_by?: string;
          description?: string | null;
          has_image?: boolean;
          id?: string;
          inserted_at?: string;
          linked?: boolean;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'components_component_type_id_fkey';
            columns: ['component_type_id'];
            referencedRelation: 'component_types';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'components_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      page_tags: {
        Row: {
          page_id: string;
          tag_id: number;
        };
        Insert: {
          page_id: string;
          tag_id: number;
        };
        Update: {
          page_id?: string;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'page_tags_page_id_fkey';
            columns: ['page_id'];
            referencedRelation: 'pages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'page_tags_tag_id_fkey';
            columns: ['tag_id'];
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      page_types: {
        Row: {
          description: string | null;
          id: number;
          inserted_at: string;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          inserted_at?: string;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          inserted_at?: string;
          name?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: {
          created_by: string;
          description: string | null;
          has_image: boolean;
          id: string;
          inserted_at: string;
          linked: boolean;
          name: string;
          page_type_id: number;
          updated_at: string;
        };
        Insert: {
          created_by: string;
          description?: string | null;
          has_image?: boolean;
          id?: string;
          inserted_at?: string;
          linked?: boolean;
          name: string;
          page_type_id: number;
          updated_at?: string;
        };
        Update: {
          created_by?: string;
          description?: string | null;
          has_image?: boolean;
          id?: string;
          inserted_at?: string;
          linked?: boolean;
          name?: string;
          page_type_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pages_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'pages_page_type_id_fkey';
            columns: ['page_type_id'];
            referencedRelation: 'page_types';
            referencedColumns: ['id'];
          },
        ];
      };
      project_components: {
        Row: {
          component_id: string;
          inserted_at: string;
          params: Json;
          project_id: string;
        };
        Insert: {
          component_id: string;
          inserted_at?: string;
          params: Json;
          project_id: string;
        };
        Update: {
          component_id?: string;
          inserted_at?: string;
          params?: Json;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'project_components_component_id_fkey';
            columns: ['component_id'];
            referencedRelation: 'components';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'project_components_project_id_fkey';
            columns: ['project_id'];
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      project_pages: {
        Row: {
          inserted_at: string;
          page_id: string;
          params: Json;
          project_id: string;
        };
        Insert: {
          inserted_at?: string;
          page_id: string;
          params: Json;
          project_id: string;
        };
        Update: {
          inserted_at?: string;
          page_id?: string;
          params?: Json;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'project_pages_page_id_fkey';
            columns: ['page_id'];
            referencedRelation: 'pages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'project_pages_project_id_fkey';
            columns: ['project_id'];
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      projects: {
        Row: {
          created_by: string;
          description: string | null;
          id: string;
          inserted_at: string;
          name: string;
          slug: string;
          template_id: string;
        };
        Insert: {
          created_by: string;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          name: string;
          slug: string;
          template_id: string;
        };
        Update: {
          created_by?: string;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          name?: string;
          slug?: string;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'projects_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'projects_template_id_fkey';
            columns: ['template_id'];
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          },
        ];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Insert: {
          id?: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Update: {
          id?: number;
          permission?: Database['public']['Enums']['app_permission'];
          role?: Database['public']['Enums']['app_role'];
        };
        Relationships: [];
      };
      tags: {
        Row: {
          color: string;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          color: string;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          color?: string;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      template_components: {
        Row: {
          component_id: string;
          inserted_at: string;
          params: Json;
          template_id: string;
        };
        Insert: {
          component_id: string;
          inserted_at?: string;
          params: Json;
          template_id: string;
        };
        Update: {
          component_id?: string;
          inserted_at?: string;
          params?: Json;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'template_components_component_id_fkey';
            columns: ['component_id'];
            referencedRelation: 'components';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'template_components_template_id_fkey';
            columns: ['template_id'];
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          },
        ];
      };
      template_pages: {
        Row: {
          inserted_at: string;
          page_id: string;
          params: Json;
          template_id: string;
        };
        Insert: {
          inserted_at?: string;
          page_id: string;
          params: Json;
          template_id: string;
        };
        Update: {
          inserted_at?: string;
          page_id?: string;
          params?: Json;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'template_pages_page_id_fkey';
            columns: ['page_id'];
            referencedRelation: 'pages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'template_pages_template_id_fkey';
            columns: ['template_id'];
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          },
        ];
      };
      templates: {
        Row: {
          description: string | null;
          id: string;
          inserted_at: string;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          inserted_at?: string;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          inserted_at?: string;
          name?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_roles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          id: string;
          username: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission'];
          user_id: string;
        };
        Returns: boolean;
      };
      copy_template_to_project: {
        Args: {
          template_id: string;
          project_id: string;
        };
        Returns: undefined;
      };
      get_project_stats: {
        Args: Record<PropertyKey, never>;
        Returns: Database['public']['CompositeTypes']['project_stats'];
      };
    };
    Enums: {
      app_permission:
        | 'projects.create'
        | 'projects.delete'
        | 'components.delete'
        | 'pages.delete';
      app_role: 'admin' | 'moderator';
    };
    CompositeTypes: {
      project_stats: {
        total: number;
        created: number;
        deleted: number;
      };
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
