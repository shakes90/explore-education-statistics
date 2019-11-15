﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces.ManageContent;
using GovUk.Education.ExploreEducationStatistics.Admin.ViewModels.ManageContent;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using static GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Utils.ReleaseUtils;
using Microsoft.EntityFrameworkCore;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services.ManageContent
{
    public class ManageContentPageService : IManageContentPageService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ManageContentPageService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<Either<ValidationResult, ManageContentPageViewModel>> GetManageContentPageViewModelAsync(Guid releaseId)
        {
            return CheckReleaseExists(_context, releaseId, release => 
                new ManageContentPageViewModel()
                {
                    Release = _mapper.Map<ReleaseViewModel>(release),
                    ReleaseNotes = new List<ReleaseNoteViewModel>()
                    {
                        new ReleaseNoteViewModel()
                        {
                            Id = new Guid("df18b1f6-9f24-4e87-9275-31a0c78b1dad"),
                            Content = "Release note 1",
                            PublishedDate = new DateTime(2019, 06, 02)
                        },
                        new ReleaseNoteViewModel()
                        {
                            Id = new Guid("c9948cde-01ce-4315-87af-eaa6cd7c6879"),
                            Content = "Release note 2",
                            PublishedDate = new DateTime(2019, 08, 10)
                        }
                    },
                    PreviousReleases = new List<BasicLink>()
                    {
                        new BasicLink()
                        {
                            Id = new Guid("faabaf92-2a47-4f53-a7ce-15b2d0afba82"),
                            Title = "2017 to 2018",
                            Url = "http://example.com/1"
                        }, new BasicLink()
                        {
                            Id = new Guid("10daf47e-2b8a-4bcb-882c-c8780bea9568"),
                            Title = "2016 to 2017",
                            Url = "http://example.com/2"
                        },
                    },
                    RelatedInformation = new List<BasicLink>()
                    {
                        new BasicLink()
                        {
                            Id = new Guid("15a8dbb8-d8b7-4247-b841-e798860a4700"),
                            Title = "Pupil absence statistics: guidance and methodology",
                            Url = "http://example.com/1"
                        },
                        new BasicLink()
                        {
                            Id = new Guid("fadedcb1-f386-4faa-a24f-6731be534097"),
                            Title = "This is an example of a related information link",
                            Url = "http://example.com/2"
                        }
                    },
                    IntroductionSection = new ContentSectionViewModel()
                    {
                        Id = new Guid("bcb96e42-a09a-4791-a377-9649b0876c58"),
                        Order = 0,
                        Caption = "Introduction section caption",
                        Heading = "Introduction section heading",
                        Content = new List<IContentBlock>()
                        {
                            new HtmlBlock()
                            {
                                Id = new Guid("65187a0b-eb17-4481-b234-949dc85f1efa"),
                                Type = "HtmlBlock",
                                Body = "<p>Read national statistical summaries and definitions, view charts and " +
                                       "tables and download data files across a range of pupil absence subject " +
                                       "areas.</p>" + 
                                       "<p>You can also view a regional breakdown of statistics and data within the " +
                                       "<a href=\"#\">local authorities section</a></p>",
                            }
                        }
                    },
                    ContentSections = new List<ContentSectionViewModel>()
                    {
                        new ContentSectionViewModel()
                        {
                            Id = new Guid("4675309a-97f3-4072-b79a-b54c59ff6686"),
                            Order = 0,
                            Caption = "About this release caption",
                            Heading = "About this release",
                            Content = new List<IContentBlock>()
                            {
                                new HtmlBlock()
                                {
                                    Id = new Guid("fc2e623d-2d9b-4312-ac6a-1ca1bf5ad10c"),
                                    Type = "HtmlBlock",
                                    Body = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
                                }
                            }
                        },
                        new ContentSectionViewModel()
                        {
                            Id = new Guid("7bce6d46-5dc3-431b-847d-a3f9fa447a55"),
                            Order = 1,
                            Caption = "New content caption",
                            Heading = "New content",
                            Content = new List<IContentBlock>()
                            {
                                new HtmlBlock()
                                {
                                    Id = new Guid("3a38fbf2-c4b4-4928-ba2e-139e32317f27"),
                                    Type = "HtmlBlock",
                                    Body = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
                                },
                                new HtmlBlock()
                                {
                                    Id = new Guid("3a72a162-689b-433c-9cf4-d2b963dc850e"),
                                    Type = "HtmlBlock",
                                    Body = "<p>Second content block.</p>",
                                }
                            }
                        }
                    }
                }
            , HydrateReleaseForReleaseViewModel);
        }
        
        private static IQueryable<Release> HydrateReleaseForReleaseViewModel(IQueryable<Release> values)
        {
            return values
                .Include(r => r.Publication)
                .ThenInclude(publication => publication.Contact)
                .Include(r => r.Type);
        }
    }
}