CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
CREATE INDEX post_body_index 
   ON asks USING GIN (to_tsvector('english', content));