DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_enum 
        WHERE enumtypid = 'public.app_permission'::regtype
        AND enumlabel = 'pages.delete'
    ) THEN
        ALTER TYPE public.app_permission ADD VALUE 'pages.delete';
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.page_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);
-- テーブルに対するコメント
COMMENT ON TABLE public.page_types IS 'Table for storing different types of pages, such as for categorization or classification purposes.';

-- 各カラムに対するコメント
COMMENT ON COLUMN public.page_types.id IS 'Primary key for the page type.';
COMMENT ON COLUMN public.page_types.name IS 'Name of the page type, must be unique.';
COMMENT ON COLUMN public.page_types.description IS 'Optional description for the page type.';
COMMENT ON COLUMN public.page_types.inserted_at IS 'Timestamp of when the page type was inserted, in UTC timezone.';


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    page_type_id INT REFERENCES page_types(id) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    data JSONB NOT NULL
);
-- テーブルに対するコメント
COMMENT ON TABLE pages IS 'Table for storing individual pages, including their types, authors, and additional data.';

-- 各カラムに対するコメント
COMMENT ON COLUMN pages.id IS 'Primary key for the page, generated automatically as a UUID.';
COMMENT ON COLUMN pages.name IS 'Name of the page, must be unique.';
COMMENT ON COLUMN pages.description IS 'Optional description for the page.';
COMMENT ON COLUMN pages.page_type_id IS 'Foreign key referencing the page_types table, identifying the type of the page.';
COMMENT ON COLUMN pages.inserted_at IS 'Timestamp of when the page was inserted, in UTC timezone.';
COMMENT ON COLUMN pages.created_by IS 'Foreign key referencing the users table, identifying the creator of the page.';
COMMENT ON COLUMN pages.data IS 'JSONB column for storing additional data related to the page.';


-- Secure the tables
ALTER TABLE public.pages
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_types
  ENABLE ROW LEVEL SECURITY;
  
CREATE POLICY "Allow logged-in read access" ON public.page_types
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow logged-in read access" ON public.pages
  FOR SELECT USING (auth.role() = 'authenticated');
  CREATE POLICY "Allow logged-in update access" ON public.pages
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow individual insert access" ON public.pages
  FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Allow individual delete access" ON public.pages
  FOR DELETE USING (auth.uid() = created_by);
CREATE POLICY "Allow authorized delete access" ON public.pages
  FOR DELETE USING (authorize('pages.delete', auth.uid()));

-- add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.pages;

-- CONSTANTS DATA
INSERT INTO public.page_types (name, description) VALUES
    ('Home', 'ウェブサイトのホームページ。訪問者の起点となるページ。'),
    ('About', '企業、組織、個人についての情報を提供するページ。'),
    ('Contact', '連絡先情報およびお問い合わせフォームが含まれるページ。'),
    ('Products', '提供される製品のリストと説明があるページ。'),
    ('Services', '提供されるサービスのリストと説明があるページ。'),
    ('FAQ', '訪問者サポートのためのよくある質問ページ。'),
    ('Privacy Policy', 'ウェブサイトのプライバシーポリシーを概説するページ。'),
    ('Terms of Service', 'ウェブサイトの利用規約を説明するページ。'),
    ('Blog', 'ブログ投稿や記事用のページ。'),
    ('Portfolio', '作業、製品、プロジェクトを展示するページ。'),
    ('Testimonials', '顧客またはクライアントの推薦文があるページ。'),
    ('Careers', '求人情報とキャリアの機会をリストするページ。'),
    ('Gallery', '画像、ビデオ、その他のメディアのギャラリーを表示するページ。'),
    ('Support', 'ヘルプリソースを提供するカスタマーサポートページ。'),
    ('Events', '今後のイベントやウェビナーをリストするページ。'),
    ('Press', 'プレスリリースとメディアキットがあるプレスまたはメディア関連のページ。'),
    ('Community', 'フォーラムやソーシャルメディアリンクがあるコミュニティページ。'),
    ('E-commerce', 'オンラインショッピングとチェックアウトに関連するページ。'),
    ('Downloads', 'ダウンロード可能なコンテンツやリソースを提供するページ。'),
    ('Accessibility', 'アクセシビリティ情報とリソースページ。'),
    -- 管理画面系の項目
    ('Login', 'ユーザーがログインするためのページ。'),
    ('Logout', 'ユーザーがログアウトするページ。'),
    ('Admin Dashboard', '管理者がサイト全体を管理するためのダッシュボードページ。'),
    ('User Profile', 'ユーザーのプロフィールを表示・編集するページ。'),
    ('Settings', 'ユーザーまたは管理者がサイトの設定を調整するページ。'),
    ('User Management', '管理者がユーザーを管理するためのページ。'),
    ('Content Management', 'コンテンツを管理するためのページ。'),
    ('System Logs', 'システムログや監査トレイルを表示するページ。');

-- リレーションテーブルの作成
CREATE TABLE project_pages (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    params JSONB NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    PRIMARY KEY (project_id, page_id)
);

-- テーブルとカラムの説明コメント
COMMENT ON TABLE project_pages IS 'Table linking projects and pages, allowing a many-to-many relationship between them.';
COMMENT ON COLUMN project_pages.project_id IS 'Foreign key referencing the projects table, identifying the project.';
COMMENT ON COLUMN project_pages.page_id IS 'Foreign key referencing the pages table, identifying the page.';
COMMENT ON COLUMN project_pages.params IS 'Optional JSONB column for storing additional parameters related to the linkage between project and page.';

-- RLSの設定
ALTER TABLE project_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_pages FORCE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged-in read access"
    ON project_pages
    FOR SELECT
    USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."project_pages"
    AS PERMISSIVE FOR INSERT
    TO authenticated
    WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only"
    ON "public"."project_pages"
    AS PERMISSIVE FOR DELETE
    TO authenticated
    USING (true);
