-- タグテーブル
CREATE TABLE public.tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT NOT NULL -- カラーコードを格納するためのカラム
);

COMMENT ON TABLE public.tags IS 'Table for storing tags, which can be associated with components and pages.';
COMMENT ON COLUMN public.tags.name IS 'Name of the tag.';
COMMENT ON COLUMN public.tags.description IS 'Description of the tag.';
COMMENT ON COLUMN public.tags.color IS 'Color code associated with the tag. (ex. #000000)';

-- componentsとtagsを関連付けるための中間テーブル
CREATE TABLE public.component_tags (
    component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
    tag_id INT REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (component_id, tag_id)
);

COMMENT ON TABLE public.component_tags IS 'Associative table for components and tags.';
COMMENT ON COLUMN public.component_tags.component_id IS 'Reference to the component.';
COMMENT ON COLUMN public.component_tags.tag_id IS 'Reference to the tag.';

-- pagesとtagsを関連付けるための中間テーブル
CREATE TABLE public.page_tags (
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    tag_id INT REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (page_id, tag_id)
);

COMMENT ON TABLE public.page_tags IS 'Associative table for pages and tags.';
COMMENT ON COLUMN public.page_tags.page_id IS 'Reference to the page.';
COMMENT ON COLUMN public.page_tags.tag_id IS 'Reference to the tag.';

-- tagsテーブル用
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY all_authenticated ON public.tags
    FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated');

-- component_tagsテーブル用
ALTER TABLE public.component_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY all_authenticated ON public.component_tags
    FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated');

-- page_tagsテーブル用
ALTER TABLE public.page_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY all_authenticated ON public.page_tags
    FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated');
