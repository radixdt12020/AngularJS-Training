namespace AngularJSTraining.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class vProduct
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductId { get; set; }

        [StringLength(100)]
        public string ProductName { get; set; }

        public decimal? Price { get; set; }

        [StringLength(100)]
        public string CategoryName { get; set; }

        [StringLength(100)]
        public string BrandName { get; set; }

        [StringLength(50)]
        public string Color { get; set; }

        [Key]
        [Column(Order = 1)]
        public bool IsInStock { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? LastModifiedBy { get; set; }

        public DateTime? LastModifiedDate { get; set; }
    }
}
