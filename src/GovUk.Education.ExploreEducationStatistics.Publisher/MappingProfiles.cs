using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Publisher.Model.ViewModels;

namespace GovUk.Education.ExploreEducationStatistics.Publisher
{
    /**
     * AutoMapper Profile which is configured by AutoMapper.Extensions.Microsoft.DependencyInjection.
     */
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BasicLink, LinkViewModel>();

            CreateMap<Contact, ContactViewModel>();

            CreateContentBlockMap();

            CreateMap<ContentSection, ContentSectionViewModel>();

            CreateMap<ExternalMethodology, ExternalMethodologyViewModel>();

            CreateMap<Link, LinkViewModel>();

            CreateMap<Methodology, MethodologySummaryViewModel>();

            CreateMap<Methodology, MethodologyViewModel>();

            CreateMap<Publication, PublicationTitleViewModel>();

            CreateMap<Publication, CachedPublicationViewModel>()
                .ForMember(dest => dest.Releases, m => m.Ignore());

            CreateMap<Release, CachedReleaseViewModel>()
                .ForMember(
                    dest => dest.Content,
                    m => m.MapFrom(r => r.GenericContent));

            CreateMap<Release, ReleaseTitleViewModel>();

            CreateMap<ReleaseType, ReleaseTypeViewModel>();

            CreateMap<Theme, ThemeViewModel>();

            CreateMap<Topic, TopicViewModel>();

            CreateMap<Update, ReleaseNoteViewModel>();
        }

        private void CreateContentBlockMap()
        {
            CreateMap<IContentBlock, IContentBlockViewModel>()
                .IncludeAllDerived();

            CreateDataBlockMap();

            CreateMap<HtmlBlock, HtmlBlockViewModel>();

            CreateMap<InsetTextBlock, InsetTextBlockViewModel>();

            CreateMap<MarkDownBlock, MarkDownBlockViewModel>();
        }

        private void CreateDataBlockMap()
        {
            CreateMap<DataBlock, DataBlockViewModel>();

            CreateMap<Summary, DataBlockSummaryViewModel>();

            CreateMap<Table, DataBlockTableViewModel>();

            CreateMap<TableHeaders, DataBlockTableHeadersViewModel>();

            CreateMap<TableOption, DataBlockTableOptionViewModel>();

            CreateMap<TableRowGroupOption, DataBlockTableRowGroupOptionViewModel>();
        }
    }
}