﻿using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api.Statistics;
using GovUk.Education.ExploreEducationStatistics.Admin.Mappings;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api.Statistics;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.MapperUtils;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Controllers.Api.Statistics
{
    public class FootnoteControllerTests
    {
        private readonly FootnoteController _controller;

        private static readonly Guid FootnoteId = Guid.NewGuid();

        private readonly Guid _releaseId = Guid.NewGuid();

        public FootnoteControllerTests()
        {
            var subjectIds = new[] {Guid.NewGuid(), Guid.NewGuid()};

            var filterService = new Mock<IFilterService>();
            var indicatorGroupService = new Mock<IIndicatorGroupService>();
            var footnoteService = new Mock<IFootnoteService>();
            var releaseMetaService = new Mock<IReleaseMetaService>();

            var footnote = new Footnote
            {
                Id = FootnoteId,
                Content = "Sample footnote",
                Filters = new List<FilterFootnote>(),
                FilterGroups = new List<FilterGroupFootnote>(),
                FilterItems = new List<FilterItemFootnote>(),
                Indicators = new List<IndicatorFootnote>(),
                Subjects = new List<SubjectFootnote>()
            };

            footnoteService.Setup(s => s.Exists(FootnoteId)).Returns(true);

            footnoteService.Setup(s => s.CreateFootnote("Sample footnote",
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>())).Returns(footnote);

            footnoteService.Setup(s => s.UpdateFootnote(FootnoteId,
                "Updated sample footnote",
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>(),
                It.IsAny<IEnumerable<Guid>>())).Returns(new Footnote
            {
                Id = FootnoteId,
                Content = "Updated sample footnote",
                Filters = new List<FilterFootnote>(),
                FilterGroups = new List<FilterGroupFootnote>(),
                FilterItems = new List<FilterItemFootnote>(),
                Indicators = new List<IndicatorFootnote>(),
                Subjects = new List<SubjectFootnote>()
            });

            footnoteService.Setup(s => s.GetFootnotes(_releaseId)).Returns(new List<Footnote>
            {
                footnote
            });

            var subjects = subjectIds.Select(id => new IdLabel(id, $"Subject {id}")).ToList();
            releaseMetaService.Setup(s => s.GetSubjects(_releaseId)).Returns(subjects);

            filterService.Setup(s => s.GetFiltersIncludingItems(It.IsIn(subjectIds))).Returns(
                new List<Filter>
                {
                    new Filter
                    {
                        Id = Guid.NewGuid(),
                        Hint = "Filter Hint",
                        Label = "Filter label",
                        Name = "Filter name",
                        FilterGroups = new List<FilterGroup>
                        {
                            new FilterGroup
                            {
                                Id = Guid.NewGuid(),
                                Label = "Filter group",
                                FilterItems = new List<FilterItem>
                                {
                                    new FilterItem
                                    {
                                        Id = Guid.NewGuid(),
                                        Label = "Filter item",
                                    }
                                }
                            }
                        }
                    }
                }
            );

            indicatorGroupService.Setup(s => s.GetIndicatorGroups(It.IsIn(subjectIds))).Returns(
                new List<IndicatorGroup>
                {
                    new IndicatorGroup
                    {
                        Id = Guid.NewGuid(),
                        Label = "Indicator group",
                        Indicators = new List<Indicator>
                        {
                            new Indicator
                            {
                                Id = Guid.NewGuid(),
                                Label = "Indicator label",
                                Name = "Indicator name",
                                Unit = Unit.Percent
                            }
                        }
                    }
                });

            _controller = new FootnoteController(filterService.Object,
                footnoteService.Object,
                indicatorGroupService.Object,
                releaseMetaService.Object,
                MapperForProfiles(new Profile[] {new MappingProfiles(), new DataMappingProfiles()}));
        }

        [Fact]
        public void Post_CreateFootnote_Returns_Ok()
        {
            var result = _controller.CreateFootnote(new CreateFootnoteViewModel
            {
                Content = "Sample footnote",
                Filters = new List<Guid>(),
                FilterGroups = new List<Guid>(),
                FilterItems = new List<Guid>(),
                Indicators = new List<Guid>(),
                Subjects = new List<Guid>()
            });

            Assert.IsAssignableFrom<FootnoteViewModel>(result.Value);
        }

        [Fact]
        public void Get_Footnotes_Returns_Ok()
        {
            var result = _controller.GetFootnotes(_releaseId);
            Assert.IsAssignableFrom<FootnotesViewModel>(result.Value);
        }

        [Fact]
        public void Put_UpdateFootnote_Returns_Ok()
        {
            var result = _controller.UpdateFootnote(FootnoteId, new UpdateFootnoteViewModel
            {
                Content = "Updated sample footnote",
                Filters = new List<Guid>(),
                FilterGroups = new List<Guid>(),
                FilterItems = new List<Guid>(),
                Indicators = new List<Guid>(),
                Subjects = new List<Guid>()
            });

            Assert.IsAssignableFrom<FootnoteViewModel>(result.Value);
        }

        [Fact]
        public void Delete_CreateFootnote_Returns_Ok()
        {
            var result = _controller.DeleteFootnote(FootnoteId);
            Assert.IsAssignableFrom<NoContentResult>(result);
        }
    }
}