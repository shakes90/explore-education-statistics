﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Chart;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data.Query;
using JsonKnownTypes;
using Newtonsoft.Json;

namespace GovUk.Education.ExploreEducationStatistics.Content.Model
{
    [JsonConverter(typeof(JsonKnownTypesConverter<ContentBlock>))]
    [JsonDiscriminator(Name = "Type")]
    [KnownType(typeof(MarkDownBlock))]
    [KnownType(typeof(DataBlock))]
    [KnownType(typeof(HtmlBlock))]
    public abstract class ContentBlock
    {
        public Guid Id { get; set; }

        [JsonIgnore] public ContentSection ContentSection { get; set; }

        [JsonIgnore] public Guid? ContentSectionId { get; set; }

        public int Order { get; set; }

        public List<Comment> Comments { get; set; }

        public ContentBlock Clone(CreateClonedContext ctx, ContentSection newParent)
        {
            var copy = MemberwiseClone() as ContentBlock;
            copy.Id = Guid.NewGuid();
            ctx.OldToNewIdContentBlockMappings.Add(this, copy);

            if (newParent != null)
            {
                copy.ContentSection = newParent;
                copy.ContentSectionId = newParent.Id;
            }

            // start a new amendment with no comments
            copy.Comments = new List<Comment>();
            return copy;
        }
    }

    public class MarkDownBlock : ContentBlock
    {
        public MarkDownBlock()
        {
        }

        public string Body { get; set; }
    }

    public class HtmlBlock : ContentBlock
    {
        public HtmlBlock()
        {
        }

        public string Body { get; set; }
    }

    public class DataBlock : ContentBlock
    {
        public DataBlock()
        {
        }

        public string Heading { get; set; }

        public string Name { get; set; }

        public string HighlightName { get; set; }

        public string Source { get; set; }

        public ObservationQueryContext Query { get; set; }

        public List<IContentBlockChart> Charts { get; set; }

        public DataBlockSummary Summary { get; set; }

        public TableBuilderConfiguration Table { get; set; }
    }

    [AttributeUsage(AttributeTargets.Field)]
    public class ContentBlockClassType : Attribute
    {
        public Type Type { get; set; }
    }

    public enum ContentBlockType
    {
        [ContentBlockClassType(Type = typeof(HtmlBlock))]
        HtmlBlock
    }

    public static class ContentBlockUtil
    {
        public static Type GetContentBlockClassTypeFromEnumValue(ContentBlockType enumValue)
        {
            return enumValue.GetEnumAttribute<ContentBlockClassType>().Type;
        }
    }
}