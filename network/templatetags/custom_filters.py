from django import template

register = template.Library()

@register.filter(name='has_liked')
def has_liked(post, user):
    return post.likes.filter(id=user.id).exists()