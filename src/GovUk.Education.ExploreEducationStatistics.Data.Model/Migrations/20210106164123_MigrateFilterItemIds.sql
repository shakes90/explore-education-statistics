UPDATE Observation
SET FilterItemIds = q.Ids
FROM (
         SELECT STRING_AGG(CAST(FI.id AS NVARCHAR(50)), ' ') AS Ids,
                o.Id AS ObservationId
         FROM Observation o
                  JOIN ObservationFilterItem ofi ON o.Id = ofi.ObservationId
                  JOIN FilterItem FI on ofi.FilterItemId = FI.Id
         GROUP BY o.Id) q
WHERE q.ObservationId = Id;