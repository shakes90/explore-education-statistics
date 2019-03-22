﻿// <auto-generated />
using System;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190318103451_AddSchoolLaEstabAndLocalAuthorityCodeIndexes")]
    partial class AddSchoolLaEstabAndLocalAuthorityCodeIndexes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.CharacteristicDataLa", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Attributes");

                    b.Property<string>("Characteristic");

                    b.Property<string>("CharacteristicName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(Characteristic, '$.characteristic_1')");

                    b.Property<string>("Country");

                    b.Property<string>("Level")
                        .IsRequired();

                    b.Property<string>("LocalAuthority");

                    b.Property<string>("LocalAuthorityCode")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(LocalAuthority, '$.new_la_code')");

                    b.Property<Guid>("PublicationId");

                    b.Property<string>("Region");

                    b.Property<string>("RegionCode")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(Region, '$.region_code')");

                    b.Property<long>("ReleaseId");

                    b.Property<string>("SchoolType")
                        .IsRequired();

                    b.Property<string>("Term");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("CharacteristicName");

                    b.HasIndex("Level");

                    b.HasIndex("LocalAuthorityCode");

                    b.HasIndex("PublicationId");

                    b.HasIndex("ReleaseId");

                    b.HasIndex("SchoolType");

                    b.HasIndex("Year");

                    b.ToTable("CharacteristicDataLa");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.CharacteristicDataNational", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Attributes");

                    b.Property<string>("Characteristic");

                    b.Property<string>("CharacteristicName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(Characteristic, '$.characteristic_1')");

                    b.Property<string>("Country");

                    b.Property<string>("Level")
                        .IsRequired();

                    b.Property<Guid>("PublicationId");

                    b.Property<long>("ReleaseId");

                    b.Property<string>("SchoolType")
                        .IsRequired();

                    b.Property<string>("Term");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("CharacteristicName");

                    b.HasIndex("Level");

                    b.HasIndex("PublicationId");

                    b.HasIndex("ReleaseId");

                    b.HasIndex("SchoolType");

                    b.HasIndex("Year");

                    b.ToTable("CharacteristicDataNational");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.GeographicData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Attributes");

                    b.Property<string>("Country");

                    b.Property<string>("Level")
                        .IsRequired();

                    b.Property<string>("LocalAuthority");

                    b.Property<string>("LocalAuthorityCode")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(LocalAuthority, '$.new_la_code')");

                    b.Property<Guid>("PublicationId");

                    b.Property<string>("Region");

                    b.Property<string>("RegionCode")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(Region, '$.region_code')");

                    b.Property<long>("ReleaseId");

                    b.Property<string>("School");

                    b.Property<string>("SchoolLaEstab")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("JSON_VALUE(School, '$.laestab')");

                    b.Property<string>("SchoolType")
                        .IsRequired();

                    b.Property<string>("Term");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("Level");

                    b.HasIndex("LocalAuthorityCode");

                    b.HasIndex("PublicationId");

                    b.HasIndex("ReleaseId");

                    b.HasIndex("SchoolLaEstab");

                    b.HasIndex("SchoolType");

                    b.HasIndex("Year");

                    b.ToTable("GeographicData");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Meta.AttributeMeta", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("KeyIndicator");

                    b.Property<string>("Label");

                    b.Property<string>("Name");

                    b.Property<string>("Unit")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("AttributeMeta");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Meta.CharacteristicMeta", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Group");

                    b.Property<string>("Label");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CharacteristicMeta");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", b =>
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

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.ReleaseAttributeMeta", b =>
                {
                    b.Property<long>("ReleaseId");

                    b.Property<long>("AttributeMetaId");

                    b.Property<string>("DataType");

                    b.Property<string>("Group");

                    b.HasKey("ReleaseId", "AttributeMetaId", "DataType");

                    b.HasIndex("AttributeMetaId");

                    b.ToTable("ReleaseAttributeMeta");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.ReleaseCharacteristicMeta", b =>
                {
                    b.Property<long>("ReleaseId");

                    b.Property<long>("CharacteristicMetaId");

                    b.Property<string>("DataType");

                    b.HasKey("ReleaseId", "CharacteristicMetaId", "DataType");

                    b.HasIndex("CharacteristicMetaId");

                    b.ToTable("ReleaseCharacteristicMeta");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.CharacteristicDataLa", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", "Release")
                        .WithMany()
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.CharacteristicDataNational", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", "Release")
                        .WithMany()
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.GeographicData", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", "Release")
                        .WithMany()
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.ReleaseAttributeMeta", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Meta.AttributeMeta", "AttributeMeta")
                        .WithMany("ReleaseAttributeMetas")
                        .HasForeignKey("AttributeMetaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", "Release")
                        .WithMany("ReleaseAttributeMetas")
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.ReleaseCharacteristicMeta", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Meta.CharacteristicMeta", "CharacteristicMeta")
                        .WithMany("ReleaseCharacteristicMetas")
                        .HasForeignKey("CharacteristicMetaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Release", "Release")
                        .WithMany("ReleaseCharacteristicMetas")
                        .HasForeignKey("ReleaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
