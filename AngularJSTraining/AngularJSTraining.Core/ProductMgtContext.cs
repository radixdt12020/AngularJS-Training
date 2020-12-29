namespace AngularJSTraining.Core
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProductMgtContext : DbContext
    {
        public ProductMgtContext()
            : base("name=ProductMgtContext")
        {
        }

        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<vProduct> vProducts { get; set; }
        public virtual DbSet<vUser> vUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>()
                .HasMany(e => e.Products)
                .WithRequired(e => e.Brand)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Products)
                .WithRequired(e => e.Category)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Price)
                .HasPrecision(16, 2);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Products)
                .WithOptional(e => e.User)
                .HasForeignKey(e => e.LastModifiedBy);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Products1)
                .WithOptional(e => e.User1)
                .HasForeignKey(e => e.CreatedBy);

            modelBuilder.Entity<vProduct>()
                .Property(e => e.Price)
                .HasPrecision(16, 2);
        }
    }
}
