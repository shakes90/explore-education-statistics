CREATE FULLTEXT CATALOG statistics_fulltext_catalog;

CREATE FULLTEXT INDEX ON Observation 
( 
    FilterItemIds 
        LANGUAGE 0 
) 
KEY INDEX PK_Observation
ON statistics_fulltext_catalog
WITH STOPLIST = OFF;