-- add columns to the projects table
ALTER TABLE public.projects
ADD COLUMN template_id UUID REFERENCES templates(id) NOT NULL;
COMMENT ON COLUMN public.projects.template_id IS 'Foreign key referencing the templates table, identifying the template.';

ALTER TABLE deleted.projects
ADD COLUMN template_id UUID NOT NULL;
COMMENT ON COLUMN deleted.projects.template_id IS 'Foreign key referencing the templates table, identifying the template.';

-- change the trigger function to include the template_id
CREATE OR REPLACE FUNCTION deleted.handle_deleted_projects() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted.projects (id, inserted_at, slug, created_by, name, description, template_id)
  VALUES (OLD.id, OLD.inserted_at, OLD.slug, OLD.created_by, OLD.name, OLD.description, OLD.template_id);

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;
