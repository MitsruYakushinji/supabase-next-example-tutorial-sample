-- tables
CREATE TABLE templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);
COMMENT ON TABLE templates IS 'Table to store template information.';

COMMENT ON COLUMN templates.id IS 'Unique identifier for the template.';
COMMENT ON COLUMN templates.name IS 'Name of the template.';
COMMENT ON COLUMN templates.description IS 'Description of the template.';
COMMENT ON COLUMN templates.inserted_at IS 'Timestamp of when the template was inserted.';

CREATE TABLE template_pages (
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    params JSONB NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    PRIMARY KEY (template_id, page_id)
);
COMMENT ON TABLE template_pages IS 'Table to associate templates with pages.';

COMMENT ON COLUMN template_pages.template_id IS 'Reference to the template.';
COMMENT ON COLUMN template_pages.page_id IS 'Reference to the page.';
COMMENT ON COLUMN template_pages.params IS 'JSON parameters for additional configuration.';
COMMENT ON COLUMN template_pages.inserted_at IS 'Timestamp of when the association was created.';

CREATE TABLE template_components (
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    component_id UUID REFERENCES components(id) ON DELETE CASCADE,
    params JSONB NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    PRIMARY KEY (template_id, component_id)
);
COMMENT ON TABLE template_components IS 'Table to associate templates with components.';

COMMENT ON COLUMN template_components.template_id IS 'Reference to the template.';
COMMENT ON COLUMN template_components.component_id IS 'Reference to the component.';
COMMENT ON COLUMN template_components.params IS 'JSON parameters for additional configuration.';
COMMENT ON COLUMN template_components.inserted_at IS 'Timestamp of when the association was created.';


-- Secure the tables
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_components ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Allow logged-in access" ON public.templates
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow logged-in access" ON public.template_pages
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow logged-in access" ON public.template_components
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- inserts a rows into project related tables
CREATE OR REPLACE FUNCTION copy_template_to_project(template_id UUID, project_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
    tid UUID := template_id;
    pid UUID := project_id;
BEGIN
    -- コピー先のproject_pagesにデータを挿入
    INSERT INTO project_pages (project_id, page_id, params)
    SELECT pid as project_id, page_id, params
    FROM template_pages
    WHERE template_pages.template_id = tid;

    -- コピー先のproject_componentsにデータを挿入
    INSERT INTO project_components (project_id, component_id, params)
    SELECT pid as project_id, component_id, params
    FROM template_components
    WHERE template_components.template_id = tid;
END;
$$;
