using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using GovUk.Education.ExploreEducationStatistics.Common.Converters;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Converters;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

// ReSharper disable NotAccessedField.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

namespace GovUk.Education.ExploreEducationStatistics.Content.Model
{
    public class DataQuery
    {
        public string path;
        public string method;
        public string body;
    }

    public class DataBlockRequest
    {
        public int SubjectId;
        public string GeographicLevel;
        public TimePeriod TimePeriod;
        public List<string> Filters;
        public List<string> Indicators;

        public List<string> Country;
        public List<string> LocalAuthority;
        public List<string> Region;
    }

    public class TimePeriod
    {
        public string StartYear;

        [JsonConverter(typeof(EnumToEnumValueJsonConverter<TimeIdentifier>))]
        public TimeIdentifier StartCode;

        public string EndYear;

        [JsonConverter(typeof(EnumToEnumValueJsonConverter<TimeIdentifier>))]
        public TimeIdentifier EndCode;
    }


    [JsonConverter(typeof(ContentBlockChartConverter))]
    public interface IContentBlockChart
    {
        string Type { get; }
    }

    public class ChartDataSet
    {
        public string Indicator;
        public List<string> Filters;
        public List<ChartDataLocation> Location;
        public string TimePeriod;
    }

    public class ChartDataLocation
    {
        public Country Country;
        public Region Region;
        public LocalAuthority LocalAuthority;
        public LocalAuthorityDistrict LocalAuthorityDistrict;
    }

    // this enum needs these like this as they match what is used in the front end
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum AxisGroupBy
    {
        timePeriods,
        locations,
        filters,
        indicators
    }

    // this enum needs these like this as they match what is used in the front end
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum ChartSymbol
    {
        circle,
        cross,
        diamond,
        square,
        star,
        triangle,
        wye
    }

    public enum LineStyle
    {
        solid,
        dashed,
        dotted
    }

    public enum Legend
    {
        none,
        bottom,
        top
    }

    // this enum needs these like this as they match what is used in the front end
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum LabelPosition
    {
        axis,
        graph,
        top,
        left,
        right,
        bottom,
        inside,
        outside,
        insideLeft,
        insideRight,
        insideTop,
        insideBottom,
        insideTopLeft,
        insideBottomLeft,
        insideTopRight
    }

    // this enum needs these like this as they match what is used in the front end
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum AxisType
    {
        major,
        minor
    }

    public class AxisConfigurationItem
    {
        public string Name;
        [JsonConverter(typeof(StringEnumConverter))]
        public AxisType Type;

        [JsonConverter(typeof(StringEnumConverter))]
        public AxisGroupBy GroupBy;

        public List<ChartDataSet> DataSets;
        public List<ReferenceLine> ReferenceLines;
        public bool Visible = true;
        public string Title;
        public bool ShowGrid = true;

        [JsonConverter(typeof(StringEnumConverter))]
        public LabelPosition LabelPosition;

        public int? Min;
        public int? Max;
        public string Size;
    }

    public class ReferenceLine
    {
        public string Label;
        public string Position;
    }

    public class ChartConfiguration
    {
        public string Label;
        public string Value;
        public string Name;
        public string Unit;
        public string Colour;

        [JsonConverter(typeof(StringEnumConverter))]
        public ChartSymbol symbol;

        [JsonConverter(typeof(StringEnumConverter))]
        public LineStyle LineStyle = LineStyle.solid;
    }

    public class LineChart : IContentBlockChart
    {
        public string Type => "line";
        public int Width;
        public int Height;
        
        [JsonConverter(typeof(StringEnumConverter))]
        public Legend Legend;
        
        public Dictionary<string, ChartConfiguration> Labels;
        public Dictionary<string, AxisConfigurationItem> Axes;
    }

    public class HorizontalBarChart : IContentBlockChart
    {
        public string Type => "horizontalbar";
        public int Width;
        public int Height;
        
        [JsonConverter(typeof(StringEnumConverter))]
        public Legend Legend;
        
        public Dictionary<string, ChartConfiguration> Labels;
        public Dictionary<string, AxisConfigurationItem> Axes;
        public bool Stacked;
    }

    public class VerticalBarChart : IContentBlockChart
    {
        public string Type => "verticalbar";
        public Dictionary<string, ChartConfiguration> Labels;
        public Dictionary<string, AxisConfigurationItem> Axes;
        public bool Stacked;
        public int Width;
        public int Height;
        
        [JsonConverter(typeof(StringEnumConverter))]
        public Legend Legend;
    }

    public class MapChart : IContentBlockChart
    {
        public string Type => "map";
        public int Width;
        public int Height;
        public Dictionary<string, ChartConfiguration> Labels;
        public Dictionary<string, AxisConfigurationItem> Axes;
    }
}