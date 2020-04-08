﻿// <auto-generated />
using System;
using GovUk.Education.ExploreEducationStatistics.Admin.Areas.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Migrations
{
    [DbContext(typeof(UsersAndRolesDbContext))]
    partial class UsersAndRolesDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Admin.Areas.Identity.Data.Models.UserInvite", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Accepted")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Email");

                    b.HasIndex("RoleId");

                    b.ToTable("UserInvites");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Admin.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "e7f7c82e-aaf3-43db-a5ab-755678f67d04",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "analyst1@example.com",
                            EmailConfirmed = false,
                            FirstName = "Analyst1",
                            LastName = "User1",
                            LockoutEnabled = true,
                            NormalizedEmail = "ANALYST1@EXAMPLE.COM",
                            NormalizedUserName = "ANALYST1@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "analyst1@example.com"
                        },
                        new
                        {
                            Id = "6620bccf-2433-495e-995d-fc76c59d9c62",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "analyst2@example.com",
                            EmailConfirmed = false,
                            FirstName = "Analyst2",
                            LastName = "User2",
                            LockoutEnabled = true,
                            NormalizedEmail = "ANALYST2@EXAMPLE.COM",
                            NormalizedUserName = "ANALYST2@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "analyst2@example.com"
                        },
                        new
                        {
                            Id = "b390b405-ef90-4b9d-8770-22948e53189a",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "analyst3@example.com",
                            EmailConfirmed = false,
                            FirstName = "Analyst3",
                            LastName = "User3",
                            LockoutEnabled = true,
                            NormalizedEmail = "ANALYST3@EXAMPLE.COM",
                            NormalizedUserName = "ANALYST3@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "analyst3@example.com"
                        },
                        new
                        {
                            Id = "b99e8358-9a5e-4a3a-9288-6f94c7e1e3dd",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "bau1@example.com",
                            EmailConfirmed = false,
                            FirstName = "Bau1",
                            LastName = "User1",
                            LockoutEnabled = true,
                            NormalizedEmail = "BAU1@EXAMPLE.COM",
                            NormalizedUserName = "BAU1@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "bau1@example.com"
                        },
                        new
                        {
                            Id = "b6f0dfa5-0102-4b91-9aa8-f23b7d8aca63",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "bau2@example.com",
                            EmailConfirmed = false,
                            FirstName = "Bau2",
                            LastName = "User2",
                            LockoutEnabled = true,
                            NormalizedEmail = "BAU2@EXAMPLE.COM",
                            NormalizedUserName = "BAU2@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "bau2@example.com"
                        },
                        new
                        {
                            Id = "d5c85378-df85-482c-a1ce-09654dae567d",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "prerelease1@example.com",
                            EmailConfirmed = false,
                            FirstName = "Prerelease1",
                            LastName = "User1",
                            LockoutEnabled = true,
                            NormalizedEmail = "PRERELEASE1@EXAMPLE.COM",
                            NormalizedUserName = "PRERELEASE1@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "prerelease1@example.com"
                        },
                        new
                        {
                            Id = "ee9a02c1-b3f9-402c-9e9b-4fb78d737050",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Email = "prerelease2@example.com",
                            EmailConfirmed = false,
                            FirstName = "Prerelease2",
                            LastName = "User2",
                            LockoutEnabled = true,
                            NormalizedEmail = "PRERELEASE2@EXAMPLE.COM",
                            NormalizedUserName = "PRERELEASE2@EXAMPLE.COM",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "V7ZOUEOGN2HGZDN3HKPNIHLSUWWUHTA6",
                            TwoFactorEnabled = false,
                            UserName = "prerelease2@example.com"
                        });
                });

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasMaxLength(50000);

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes");
                });

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasMaxLength(50000);

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Key");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.ToTable("PersistedGrants");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasData(
                        new
                        {
                            Id = "cf67b697-bddd-41bd-86e0-11b7e11d99b3",
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Name = "BAU User",
                            NormalizedName = "BAU USER"
                        },
                        new
                        {
                            Id = "f9ddb43e-aa9e-41ed-837d-3062e130c425",
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Name = "Analyst",
                            NormalizedName = "ANALYST"
                        },
                        new
                        {
                            Id = "17e634f4-7a2b-4a23-8636-b079877b4232",
                            ConcurrencyStamp = "85d6c75e-a6c8-4c7e-b4d0-8ee70a4879d3",
                            Name = "Prerelease User",
                            NormalizedName = "PRERELEASE USER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");

                    b.HasData(
                        new
                        {
                            Id = -2,
                            ClaimType = "ApplicationAccessGranted",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -3,
                            ClaimType = "AccessAllReleases",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -4,
                            ClaimType = "AccessAllTopics",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -5,
                            ClaimType = "MarkAllReleasesAsDraft",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -6,
                            ClaimType = "SubmitAllReleasesToHigherReview",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -7,
                            ClaimType = "ApproveAllReleases",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -8,
                            ClaimType = "UpdateAllReleases",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -9,
                            ClaimType = "CreateAnyPublication",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -10,
                            ClaimType = "CreateAnyRelease",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -11,
                            ClaimType = "ManageAnyUser",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -12,
                            ClaimType = "ManageAnyMethodology",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -13,
                            ClaimType = "ApplicationAccessGranted",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -14,
                            ClaimType = "AnalystPagesAccessGranted",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -15,
                            ClaimType = "ApplicationAccessGranted",
                            ClaimValue = "",
                            RoleId = "17e634f4-7a2b-4a23-8636-b079877b4232"
                        },
                        new
                        {
                            Id = -16,
                            ClaimType = "PrereleasePagesAccessGranted",
                            ClaimValue = "",
                            RoleId = "17e634f4-7a2b-4a23-8636-b079877b4232"
                        },
                        new
                        {
                            Id = -17,
                            ClaimType = "PrereleasePagesAccessGranted",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -18,
                            ClaimType = "AnalystPagesAccessGranted",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -19,
                            ClaimType = "PrereleasePagesAccessGranted",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -20,
                            ClaimType = "CanViewPrereleaseContacts",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -21,
                            ClaimType = "CanViewPrereleaseContacts",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -22,
                            ClaimType = "CreateAnyMethodology",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -23,
                            ClaimType = "UpdateAllMethodologies",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -24,
                            ClaimType = "AccessAllMethodologies",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -25,
                            ClaimType = "CreateAnyMethodology",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -26,
                            ClaimType = "UpdateAllMethodologies",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -27,
                            ClaimType = "AccessAllMethodologies",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -28,
                            ClaimType = "ApproveAllMethodologies",
                            ClaimValue = "",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            Id = -29,
                            ClaimType = "ApproveAllMethodologies",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            Id = -30,
                            ClaimType = "PublishContentOfAllReleases",
                            ClaimValue = "",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");

                    b.HasData(
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "5zzTEeAYz71aVPJ1ho1VGW3cYk7_qcQpkDqYYxbH3po",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "e7f7c82e-aaf3-43db-a5ab-755678f67d04"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "RLdgJMsfN6QVjpCbkaOYIpzh6DA3QpRfnBcfIx46uDM",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "6620bccf-2433-495e-995d-fc76c59d9c62"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "ces_f2I3zCjGZ9HUprWF3RiQgswrKvPFAY1Lwu_KI6M",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "b390b405-ef90-4b9d-8770-22948e53189a"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "cb3XrjF6BLuMZ5P3aRo8wBobF7tAshdk2gF0X5Qm68o",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "b99e8358-9a5e-4a3a-9288-6f94c7e1e3dd"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "EKTK7hPGgxGVxRSBjgTv51XVJhtMo91sIcADfjSuJjw",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "b6f0dfa5-0102-4b91-9aa8-f23b7d8aca63"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "uLGzMPaxGz0nY6nbff7wkBP7ly2iLdephomGPFOP0k8",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "d5c85378-df85-482c-a1ce-09654dae567d"
                        },
                        new
                        {
                            LoginProvider = "OpenIdConnect",
                            ProviderKey = "s5vNxMDGwRCvg3MTtLEDomZqOKl7cvv2f8PW5NvJzbw",
                            ProviderDisplayName = "OpenIdConnect",
                            UserId = "ee9a02c1-b3f9-402c-9e9b-4fb78d737050"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");

                    b.HasData(
                        new
                        {
                            UserId = "e7f7c82e-aaf3-43db-a5ab-755678f67d04",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            UserId = "6620bccf-2433-495e-995d-fc76c59d9c62",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            UserId = "b390b405-ef90-4b9d-8770-22948e53189a",
                            RoleId = "f9ddb43e-aa9e-41ed-837d-3062e130c425"
                        },
                        new
                        {
                            UserId = "b99e8358-9a5e-4a3a-9288-6f94c7e1e3dd",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            UserId = "b6f0dfa5-0102-4b91-9aa8-f23b7d8aca63",
                            RoleId = "cf67b697-bddd-41bd-86e0-11b7e11d99b3"
                        },
                        new
                        {
                            UserId = "d5c85378-df85-482c-a1ce-09654dae567d",
                            RoleId = "17e634f4-7a2b-4a23-8636-b079877b4232"
                        },
                        new
                        {
                            UserId = "ee9a02c1-b3f9-402c-9e9b-4fb78d737050",
                            RoleId = "17e634f4-7a2b-4a23-8636-b079877b4232"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("GovUk.Education.ExploreEducationStatistics.Admin.Areas.Identity.Data.Models.UserInvite", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Admin.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Admin.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Admin.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("GovUk.Education.ExploreEducationStatistics.Admin.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
