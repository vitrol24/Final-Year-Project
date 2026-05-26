from django.shortcuts import render




def index(request):
    ctx = {}
    return render(request, "index/index.html" , ctx)
    # return render(request, "index/index2.html" , ctx)





def about_us(request):
    ctx = {}
    return render(request, "index/about_us.html" , ctx)





def contact_us(request):
    ctx = {}
    return render(request, "index/contact_us.html" , ctx)





def documentation(request):
    ctx = {}
    return render(request, "index/documentation.html" , ctx)





def explore_designs(request):
    ctx = {}
    return render(request, "index/explore_designs.html" , ctx)