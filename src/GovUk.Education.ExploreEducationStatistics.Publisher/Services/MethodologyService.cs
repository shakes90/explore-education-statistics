﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Content.Model.ViewModels;
using GovUk.Education.ExploreEducationStatistics.Publisher.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GovUk.Education.ExploreEducationStatistics.Publisher.Services
{
    public class MethodologyService : IMethodologyService
    {
        private readonly ContentDbContext _context;

        public MethodologyService(
            ContentDbContext context)
        {
            _context = context;
        }

        public async Task<Methodology> GetAsync(Guid id)
        {
            return await _context.Methodologies.FirstOrDefaultAsync(m => m.Id == id);
        }

        public List<ThemeTree> GetTree()
        {
            return _context.Themes
                .Include(theme => theme.Topics)
                    .ThenInclude(topic => topic.Publications)
                    .ThenInclude(publication => publication.Releases)
                .Include(theme => theme.Topics)
                    .ThenInclude(topic => topic.Publications)
                    .ThenInclude(publication => publication.Methodology)
                .Select(BuildThemeTree)
                .Where(themeTree => themeTree.Topics.Any())
                .OrderBy(theme => theme.Title)
                .ToList();
        }

        private static ThemeTree BuildThemeTree(Theme theme)
        {
            return new ThemeTree
            {
                Id = theme.Id,
                Title = theme.Title,
                Topics = theme.Topics
                    .Select(BuildTopicTree)
                    .Where(topicTree => topicTree.Publications.Any())
                    .OrderBy(topic => topic.Title)
                    .ToList()
            };
        }

        private static TopicTree BuildTopicTree(Topic topic)
        {
            return new TopicTree
            {
                Id = topic.Id,
                Title = topic.Title,
                Summary = topic.Summary,
                Publications = topic.Publications
                    .Where(publication => publication.Methodology != null && publication.Releases.Any(release => release.Live))
                    .Select(BuildPublicationTree)
                    .OrderBy(publication => publication.Title)
                    .ToList()
            };
        }

        private static PublicationTree BuildPublicationTree(Publication publication)
        {
            return new PublicationTree
            {
                Id = publication.Methodology.Id,
                Title = publication.Methodology.Title,
                Summary = publication.Methodology.Summary,
                Slug = publication.Slug
            };
        }
    }
}