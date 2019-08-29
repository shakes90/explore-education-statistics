﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services
{
    public class PreReleaseService : IPreReleaseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IReleaseService _releaseService;
        private readonly ILogger<PreReleaseService> _logger;
        
        // TODO remove when we have Users to link to a Release for its Pre Release Contacts
        private static readonly Dictionary<Guid, List<UserDetailsViewModel>> _preReleaseContactsByRelease = new Dictionary<Guid, List<UserDetailsViewModel>>();
        private readonly List<UserDetailsViewModel> _availablePreReleaseContacts;
            
        public PreReleaseService(ApplicationDbContext context, IMapper mapper, IReleaseService releaseService, ILogger<PreReleaseService> logger)
        {
            _context = context;
            _mapper = mapper;
            _releaseService = releaseService;
            _logger = logger;
            _availablePreReleaseContacts = new List<UserDetailsViewModel>()
            {
                new UserDetailsViewModel()
                {
                    Id = new Guid("9b057c20-687a-4734-9e0d-419ada88cde0"),
                    Name = "TODO Pre Release User 1",
                },
                new UserDetailsViewModel()
                {
                    Id = new Guid("4606b997-cf60-4564-86d7-bfd6cd38e879"),
                    Name = "TODO Pre Release User 2",
                },
                new UserDetailsViewModel()
                {
                    Id = new Guid("513e2657-d1a8-4d30-afb3-8d382cc4ddee"),
                    Name = "TODO Pre Release User 3",
                },
            };
        }

        public async Task<List<UserDetailsViewModel>> GetAvailablePreReleaseContactsAsync()
        {
            // TODO return a list of candidate Users once we have a concept of Users in the database
            return await Task.FromResult(_availablePreReleaseContacts);
        }
        
        // TODO revisit when we have the concept of Users int the database
        public async Task<List<UserDetailsViewModel>> GetPreReleaseContactsForReleaseAsync(Guid releaseId)
        {
            return await Task.FromResult(_preReleaseContactsByRelease.GetValueOrDefault(releaseId, new List<UserDetailsViewModel>()));
        }
        
        // TODO revisit when we have the concept of Users int the database
        public async Task<List<UserDetailsViewModel>> AddPreReleaseContactToReleaseAsync(Guid releaseId, Guid userId)
        {
            _logger.Log(LogLevel.Debug, "Pre Release User " + userId + " added to Release " + releaseId);
            
            var chosenUser = _availablePreReleaseContacts.Find(contact => contact.Id.Equals(userId));
            
            if (_preReleaseContactsByRelease.ContainsKey(releaseId)) {
                _preReleaseContactsByRelease[releaseId].Add(chosenUser);
                
            } else {
                _preReleaseContactsByRelease.Add(releaseId, new List<UserDetailsViewModel>() { chosenUser });
            }
            return await Task.FromResult(_preReleaseContactsByRelease[releaseId]);
        }
        
        // TODO revisit when we have the concept of Users int the database
        public async Task<List<UserDetailsViewModel>> RemovePreReleaseContactFromReleaseAsync(Guid releaseId, Guid userId)
        {
            _logger.Log(LogLevel.Debug, "Pre Release User " + userId + " removed from Release " + releaseId);
            
            var chosenUser = _availablePreReleaseContacts.Find(contact => contact.Id.Equals(userId));
            
            if (_preReleaseContactsByRelease.ContainsKey(releaseId)) {
                _preReleaseContactsByRelease[releaseId].Remove(chosenUser);
            }

            return await Task.FromResult(_preReleaseContactsByRelease[releaseId]);
        }
    }
}