-- add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_components;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_pages;

-- add updated_at column to the components,project_pages table
ALTER TABLE public.components ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::TEXT, now());
COMMENT ON COLUMN components.updated_at IS 'The timestamp with time zone when the component was last updated';
ALTER TABLE public.pages ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::TEXT, now());
COMMENT ON COLUMN components.updated_at IS 'The timestamp with time zone when the page was last updated';

-- トリガー関数の作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- componentsテーブルにトリガーを設定
CREATE TRIGGER trigger_update_updated_at_components
BEFORE UPDATE ON components
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- pagesテーブルにトリガーを設定
CREATE TRIGGER trigger_update_updated_at_pages
BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
