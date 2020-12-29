namespace AngularJSTraining.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string ProductName { get; set; }

        public decimal? Price { get; set; }

        public int CategoryId { get; set; }

        public int BrandId { get; set; }

        [StringLength(50)]
        public string Color { get; set; }

        public bool IsInStock { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? LastModifiedBy { get; set; }

        public DateTime? LastModifiedDate { get; set; }

        public virtual Brand Brand { get; set; }

        public virtual Category Category { get; set; }

        public virtual User User { get; set; }

        public virtual User User1 { get; set; }
    }
}
