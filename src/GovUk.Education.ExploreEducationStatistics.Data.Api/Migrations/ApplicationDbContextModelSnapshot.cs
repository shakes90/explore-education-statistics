﻿// <auto-generated />
using System;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Filter", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("FilterGroupId");

                    b.Property<string>("Hint");

                    b.Property<string>("Label");

                    b.HasKey("Id");

                    b.HasIndex("FilterGroupId");

                    b.ToTable("Filter");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterGroup", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Label");

                    b.Property<long>("SubjectId");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("FilterGroup");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("FilterId");

                    b.Property<string>("Label");

                    b.HasKey("Id");

                    b.HasIndex("FilterId");

                    b.ToTable("FilterItem");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Indicator", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("IndicatorGroupId");

                    b.Property<string>("Label");

                    b.Property<string>("Unit")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("IndicatorGroupId");

                    b.ToTable("Indicator");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.IndicatorGroup", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Label");

                    b.Property<long>("SubjectId");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("IndicatorGroup");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Location", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Observation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Level")
                        .IsRequired();

                    b.Property<long>("LocationId");

                    b.Property<string>("Measures");

                    b.Property<string>("SchoolLaEstab");

                    b.Property<long>("SubjectId");

                    b.Property<int>("TimePeriod");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("SchoolLaEstab");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TimePeriod");

                    b.HasIndex("Year");

                    b.ToTable("Observation");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.ObservationFilterItem", b =>
                {
                    b.Property<long>("ObservationId");

                    b.Property<long>("FilterItemId");

                    b.HasKey("ObservationId", "FilterItemId");

                    b.HasIndex("FilterItemId");

                    b.ToTable("ObservationFilterItem");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Release", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("PublicationId");

                    b.Property<DateTime>("ReleaseDate");

                    b.HasKey("Id");

                    b.HasIndex("PublicationId");

                    b.ToTable("Release");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.School", b =>
                {
                    b.Property<string>("LaEstab")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AcademyOpenDate");

                    b.Property<string>("AcademyType");

                    b.Property<string>("Estab");

                    b.Property<string>("Urn");

                    b.HasKey("LaEstab");

                    b.ToTable("School");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Subject", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<long>("ReleaseId");

                    b.HasKey("Id");

                    b.HasIndex("ReleaseId");

                    b.ToTable("Subject");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Filter", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterGroup", "FilterGroup")
                        .WithMany("Filters")
                        .HasForeignKey("FilterGroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterGroup", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterItem", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Filter", "Filter")
                        .WithMany()
                        .HasForeignKey("FilterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Indicator", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.IndicatorGroup", "IndicatorGroup")
                        .WithMany("Indicators")
                        .HasForeignKey("IndicatorGroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.IndicatorGroup", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Location", b =>
                {
                    b.OwnsOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Country", "Country", b1 =>
                        {
                            b1.Property<long>("LocationId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("Code");

                            b1.Property<string>("Name");

                            b1.HasKey("LocationId");

                            b1.HasIndex("Code");

                            b1.ToTable("Location");

                            b1.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Location")
                                .WithOne("Country")
                                .HasForeignKey("GovUk.Education.ExploreEducationStatistics.Data.Model.Country", "LocationId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("GovUk.Education.ExploreEducationStatistics.Data.Model.LocalAuthority", "LocalAuthority", b1 =>
                        {
                            b1.Property<long>("LocationId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("Code");

                            b1.Property<string>("Name");

                            b1.Property<string>("Old_Code");

                            b1.HasKey("LocationId");

                            b1.HasIndex("Code");

                            b1.ToTable("Location");

                            b1.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Location")
                                .WithOne("LocalAuthority")
                                .HasForeignKey("GovUk.Education.ExploreEducationStatistics.Data.Model.LocalAuthority", "LocationId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("GovUk.Education.ExploreEducationStatistics.Data.Model.LocalAuthorityDistrict", "LocalAuthorityDistrict", b1 =>
                        {
                            b1.Property<long>("LocationId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("Code");

                            b1.Property<string>("Name");

                            b1.HasKey("LocationId");

                            b1.HasIndex("Code");

                            b1.ToTable("Location");

                            b1.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Location")
                                .WithOne("LocalAuthorityDistrict")
                                .HasForeignKey("GovUk.Education.ExploreEducationStatistics.Data.Model.LocalAuthorityDistrict", "LocationId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });

                    b.OwnsOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Region", "Region", b1 =>
                        {
                            b1.Property<long>("LocationId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("Code");

                            b1.Property<string>("Name");

                            b1.HasKey("LocationId");

                            b1.HasIndex("Code");

                            b1.ToTable("Location");

                            b1.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Location")
                                .WithOne("Region")
                                .HasForeignKey("GovUk.Education.ExploreEducationStatistics.Data.Model.Region", "LocationId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Observation", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Location", "Location")
                        .WithMany("Observations")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.School", "School")
                        .WithMany("Observations")
                        .HasForeignKey("SchoolLaEstab");

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Subject", "Subject")
                        .WithMany("Observations")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.ObservationFilterItem", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.FilterItem", "FilterItem")
                        .WithMany("Observations")
                        .HasForeignKey("FilterItemId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Observation", "Observation")
                        .WithMany("FilterItems")
                        .HasForeignKey("ObservationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Model.Subject", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Model.Release", "Release")
                        .WithMany("Subjects")
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
