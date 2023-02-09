using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.UpdateTag
{
    public class UpdateTagCommandHandler : IRequestHandler<UpdateTagCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateTagCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateTagCommand request, CancellationToken cancellationToken)
        {
            var existingTag = await _context.ProductTags.FindAsync(request.Id, cancellationToken);

            if (existingTag is null)
                throw new NotFoundException($"Update tag error. Tag with id {request.Id} not found")
                {
                    Error = "tag_not_found",
                    ErrorDescription = $"Update tag error. Tag with given id not found"
                };


            existingTag.IsB2BVisible = request.IsB2BVisible;
            existingTag.IsCollapsed = request.IsCollapsed;
            existingTag.IsRetailVisible = request.IsRetailVisible;
            existingTag.IsUniversal = request.IsUniversal;
            existingTag.ParentId = request.ParentId;
            existingTag.Name = request.Name;
            existingTag.SortOrder = request.SortOrder;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}