CREATE SCHEMA IF NOT EXISTS deleted AUTHORIZATION postgres;
GRANT USAGE ON SCHEMA deleted TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA deleted GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA deleted GRANT ALL ON FUNCTIONS TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA deleted GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
-- PROJECTS
CREATE TABLE deleted.projects (
  id            UUID PRIMARY KEY,
  inserted_at   TIMESTAMP WITH TIME ZONE NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  created_by    UUID NOT NULL,
  deleted_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE deleted.projects IS 'Deleted Projects.';

-- inserts a row into deleted.projects
CREATE OR REPLACE FUNCTION deleted.handle_deleted_projects() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted.projects (id, inserted_at, slug, created_by)
  VALUES (OLD.id, OLD.inserted_at, OLD.slug, OLD.created_by);

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- trigger the function every time a project is deleted
CREATE TRIGGER on_projects_deleted
  AFTER DELETE ON public.projects
  FOR EACH ROW
  EXECUTE PROCEDURE deleted.handle_deleted_projects();
