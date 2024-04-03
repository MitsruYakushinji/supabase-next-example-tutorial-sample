-- CUSTOM TYPE
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_stats') THEN 
    CREATE TYPE project_stats AS (
      total int,
      created int,
      deleted int
    );
  END IF; 
END 
$$;

-- FUNCTION
CREATE OR REPLACE FUNCTION get_project_stats() RETURNS project_stats AS $$
DECLARE
  result project_stats;
BEGIN
  -- トータル件数
  SELECT
    COUNT(*)
  INTO result.total
  FROM public.projects;

  -- 本日作成
  SELECT
    COUNT(*)
  INTO result.created
  FROM public.projects 
  WHERE
    inserted_at >= date_trunc('day', CURRENT_TIMESTAMP) AND
    inserted_at < date_trunc('day', CURRENT_TIMESTAMP) + INTERVAL '1 day';

  -- 本日削除
  SELECT
    COUNT(*)
  INTO result.deleted
  FROM deleted.projects
  WHERE
    deleted_at >= date_trunc('day', CURRENT_TIMESTAMP) AND
    deleted_at < date_trunc('day', CURRENT_TIMESTAMP) + INTERVAL '1 day';

    RETURN result;
END;
$$ LANGUAGE plpgsql;
