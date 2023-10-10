using Infra.InfModels;

namespace Infra.Validators;
using FluentValidation;

public class BoxValidator : AbstractValidator<Box>
{
    public BoxValidator()
    {
        RuleFor(p => p.id).NotNull();
        RuleFor(p => p.typeid).NotEmpty().NotNull();
        RuleFor(p => p.material).NotEmpty().NotNull();
        RuleFor(p => p.price).GreaterThan(0).NotNull().NotEmpty();
    }
}