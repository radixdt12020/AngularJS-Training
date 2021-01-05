namespace AngularSignalRDemo.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CustomerComplaint
    {
        [Key]
        public int ComplaintId { get; set; }

        public int CustomerId { get; set; }

        public string Description { get; set; }

        public int? ProductId { get; set; }

        public virtual Product Product { get; set; }

        public virtual User User { get; set; }
    }
}
