ALTER TABLE public.components
ADD COLUMN linked boolean not null default false,
DROP COLUMN data;

COMMENT ON COLUMN public.components.linked IS 'State of linkage with actual resources';

ALTER TABLE public.pages
ADD COLUMN linked boolean not null default false,
DROP COLUMN data;

COMMENT ON COLUMN public.pages.linked IS 'State of linkage with actual resources';
