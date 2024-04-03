-- PROJECTS

ALTER TABLE public.projects
ADD COLUMN name TEXT NOT NULL,
ADD COLUMN description TEXT;
COMMENT ON COLUMN public.projects.name IS 'Name of the project.';
COMMENT ON COLUMN public.projects.description IS 'Description of the project.';


ALTER TABLE deleted.projects
ADD COLUMN name TEXT NOT NULL,
ADD COLUMN description TEXT;
COMMENT ON COLUMN deleted.projects.name IS 'Name of the project.';
COMMENT ON COLUMN deleted.projects.description IS 'Description of the project.';

-- inserts a row into deleted.projects
CREATE OR REPLACE FUNCTION deleted.handle_deleted_projects() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted.projects (id, inserted_at, slug, created_by, name, description)
  VALUES (OLD.id, OLD.inserted_at, OLD.slug, OLD.created_by, OLD.name, OLD.description);

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;
