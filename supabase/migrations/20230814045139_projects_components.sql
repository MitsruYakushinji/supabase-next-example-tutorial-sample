-- テーブルの作成
CREATE TABLE project_components (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    component_id UUID REFERENCES components(id),
    params JSONB NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    PRIMARY KEY (project_id, component_id)
);

-- テーブルとカラムの説明コメント
COMMENT ON TABLE project_components IS 'Table linking projects and components, allowing a many-to-many relationship between them.';
COMMENT ON COLUMN project_components.project_id IS 'Foreign key referencing the projects table, identifying the project.';
COMMENT ON COLUMN project_components.component_id IS 'Foreign key referencing the components table, identifying the component.';
COMMENT ON COLUMN project_components.params IS 'Optional JSONB column for storing additional parameters related to the linkage between project and component.';

-- RLSの設定
ALTER TABLE project_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_components FORCE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged-in read access"
    ON project_components
    FOR SELECT
    USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."project_components"
    AS PERMISSIVE FOR INSERT
    TO authenticated
    WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only"
    ON "public"."project_components"
    AS PERMISSIVE FOR DELETE
    TO authenticated
    USING (true);
