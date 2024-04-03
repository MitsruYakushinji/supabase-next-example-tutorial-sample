DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_enum 
        WHERE enumtypid = 'public.app_permission'::regtype
        AND enumlabel = 'components.delete'
    ) THEN
        ALTER TYPE public.app_permission ADD VALUE 'components.delete';
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS public.component_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);
COMMENT ON TABLE public.component_types IS 'Component Types.';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE components (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    component_type_id INT REFERENCES component_types(id) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    data JSONB NOT NULL
);
COMMENT ON TABLE public.components IS 'Components.';

-- Secure the tables
ALTER TABLE public.components
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_types
  ENABLE ROW LEVEL SECURITY;
  
CREATE POLICY "Allow logged-in read access" ON public.component_types
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow logged-in read access" ON public.components
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow logged-in update access" ON public.components
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow individual insert access" ON public.components
  FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Allow individual delete access" ON public.components
  FOR DELETE USING (auth.uid() = created_by);
CREATE POLICY "Allow authorized delete access" ON public.components
  FOR DELETE USING (authorize('components.delete', auth.uid()));

-- add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.components;

-- CONSTANTS DATA
INSERT INTO component_types (name, description, inserted_at)
VALUES
    ('ヘッダー', 'ページの上部に表示されるエリア', timezone('utc'::text, now())),
    ('フッター', 'ページの下部に表示されるエリア', timezone('utc'::text, now())),
    ('サイドバー', 'ページの側面に表示される追加情報エリア', timezone('utc'::text, now())),
    ('メインコンテンツ', 'ページの主要なコンテンツエリア', timezone('utc'::text, now())),
    ('イメージギャラリー', '画像を表示するエリア', timezone('utc'::text, now())),
    ('ナビゲーションバー', 'ページ間のナビゲーションリンクを持つエリア', timezone('utc'::text, now()));
