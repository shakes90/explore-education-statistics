#!/bin/bash

BASE_PATH=/home/ben/development/dfe/explore-education-statistics/src/GovUk.Education.ExploreEducationStatistics.Data.Seed/Files/geo

importGeoData() {
  file=$BASE_PATH/$1
  code_column=$2
  name_column=$3
  boundary_level_id=$4
  layer=$5
  ogr2ogr -f MSSQLSpatial \
	  "MSSQL:Driver=ODBC Driver 17 for SQL Server;server=localhost;database=master;uid=SA;pwd=Your_Password123" \
	  $file \
	  -t_srs EPSG:4326 \
	  -skipfailures \
	  -progress \
	  -nln geometry \
	  -lco precision=NO \
	  -sql "SELECT '$boundary_level_id' AS boundary_level_id, $code_column AS code, $name_column AS name, lat, long FROM $layer"
}

importGeoData Countries/Countries_December_2017_Ultra_Generalised_Clipped_Boundaries_in_UK.shp ctry17cd ctry17nm 1 Countries_December_2017_Ultra_Generalised_Clipped_Boundaries_in_UK
importGeoData Local_Authorities/Counties_and_Unitary_Authorities_December_2018_Boundaries_EW_BUC.shp ctyua18cd ctyua18nm 2 Counties_and_Unitary_Authorities_December_2018_Boundaries_EW_BUC 
importGeoData Local_Authority_Districts/Local_Authority_Districts_December_2017_Ultra_Generalised_Clipped_Boundaries_in_United_Kingdom_WGS84.shp lad17cd lad17nm 3 Local_Authority_Districts_December_2017_Ultra_Generalised_Clipped_Boundaries_in_United_Kingdom_WGS84
importGeoData Local_Enterprise_Partnerships/Local_Enterprise_Partnerships_April_2017_Ultra_Generalised_Clipped_Boundaries_in_England_V2.shp lep17cd lep17nm 4 Local_Enterprise_Partnerships_April_2017_Ultra_Generalised_Clipped_Boundaries_in_England_V2
importGeoData Parliamentary_Constituencies/Westminster_Parliamentary_Constituencies_December_2018_UK_BUC.shp pcon18cd pcon18nm 5 Westminster_Parliamentary_Constituencies_December_2018_UK_BUC
importGeoData Regions/Regions_December_2017_Ultra_Generalised_Clipped_Boundaries_in_England.shp rgn17cd rgn17nm 6 Regions_December_2017_Ultra_Generalised_Clipped_Boundaries_in_England
importGeoData Wards/Wards_December_2018_Super_Generalised_Clipped_Boundaries_UK.shp wd18cd wd18nm 7 Wards_December_2018_Super_Generalised_Clipped_Boundaries_UK