-- Add a column to components table to indicate whether it has an associated image
ALTER TABLE components
ADD COLUMN has_image BOOLEAN DEFAULT FALSE NOT NULL;
COMMENT ON COLUMN components.has_image IS 'Flag indicating whether the component has an associated image.';
-- Add a column to pages table to indicate whether it has an associated image
ALTER TABLE pages
ADD COLUMN has_image BOOLEAN DEFAULT FALSE NOT NULL;
COMMENT ON COLUMN pages.has_image IS 'Flag indicating whether the page has an associated image.';
