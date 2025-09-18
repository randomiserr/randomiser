"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2, 
  Globe,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

interface YCCompany {
  Company: string;
  Website: string;
  YC_Link: string;
  Category: string;
  Subcategory: string;
  Description: string;
  Location: string;
  Batch: string;
  YC_OneLiner: string;
  YC_Description: string;
  Subcategory_1: string;
  Subcategory_2: string;
  Subcategory_3: string;
  Subcategory_4: string;
  Subcategory_5: string;
  Subcategory_6: string;
  Subcategory_7: string;
  Subcategory_8: string;
}

export default function YCExaminerPage() {
  const [companies, setCompanies] = useState<YCCompany[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/yc_batches.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error loading YC data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = !searchTerm || 
        company.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.YC_OneLiner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(category => 
          company.Category.toLowerCase().includes(category.toLowerCase())
        );

      return matchesSearch && matchesCategory;
    });
  }, [companies, searchTerm, selectedCategories]);

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(companies.map(c => c.Category).filter(Boolean))];
    // Filter out very specific/long categories and keep main ones
    const mainCategories = uniqueCategories
      .filter(category => {
        // Keep categories that are main/broad categories (typically shorter and more general)
        const words = category.split(/[\s-]/).length;
        return words <= 2 && category.length <= 25; // Adjust these thresholds as needed
      })
      .sort();
    return mainCategories;
  }, [companies]);

  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const categories = [...new Set(companies.map(c => c.Category).filter(Boolean))];
    const topCategories = categories.slice(0, 5);
    const locationsCount = [...new Set(companies.map(c => c.Location).filter(Boolean))].length;

    return {
      totalCompanies,
      categoriesCount: categories.length,
      topCategories,
      locationsCount
    };
  }, [companies]);

  const downloadSummary = () => {
    const summary = {
      totalCompanies: stats.totalCompanies,
      categories: stats.categoriesCount,
      topCategories: stats.topCategories,
      locations: stats.locationsCount,
      generatedAt: new Date().toISOString(),
      filteredData: filteredCompanies.map(company => ({
        company: company.Company,
        category: company.Category,
        description: company.Description,
        location: company.Location,
        website: company.Website
      }))
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yc-summary-${new Date().getFullYear()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-muted-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading YC data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-space-grotesk text-4xl font-bold text-foreground mb-2">
                YC Cohort Examiner
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore and analyze Y Combinator startup data across 2025 cohorts
              </p>
            </div>
            <Button onClick={downloadSummary} className="gap-2">
              <Download className="h-4 w-4" />
              Download Summary
            </Button>
          </div>
        </div>
        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Total Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalCompanies}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mint">{stats.categoriesCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple">{stats.locationsCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtered Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coral">{filteredCompanies.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Key Insights from 2025</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Top Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {stats.topCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="bg-mint/10 text-mint border-mint/20"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• AI/ML companies make up a significant portion of this batch</li>
                    <li>• B2B SaaS continues to dominate the landscape</li>
                    <li>• Growing trend in developer tools and infrastructure</li>
                    <li>• Healthcare and fintech remain strong verticals</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies, descriptions, or keywords..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && !selectedCategories.includes(value)) {
                    setSelectedCategories(prev => [...prev, value]);
                    setCurrentPage(1);
                  }
                }}
              >
                <SelectTrigger className="md:w-64">
                  <SelectValue placeholder="Add category filter" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter(category => !selectedCategories.includes(category.toLowerCase()))
                    .map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Filters:</span>
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="bg-purple/10 text-purple border-purple/20 cursor-pointer hover:bg-purple/20 transition-colors"
                    onClick={() => {
                      setSelectedCategories(prev => prev.filter(c => c !== category));
                      setCurrentPage(1);
                    }}
                  >
                    {categories.find(c => c.toLowerCase() === category) || category}
                    <span className="ml-1 text-xs">×</span>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategories([]);
                    setCurrentPage(1);
                  }}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Companies Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  YC Companies ({filteredCompanies.length})
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCompanies.length)}-
                  {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subcategories</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">One Liner</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCompanies.map((company, index) => (
                      <tr
                        key={`${company.Company}-${index}`}
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium text-foreground">
                                {company.Website ? (
                                  <a
                                    href={company.Website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-mint transition-colors flex items-center gap-1"
                                  >
                                    {company.Company}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  company.Company
                                )}
                              </div>
                              {company.YC_Link && (
                                <a
                                  href={company.YC_Link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-muted-foreground hover:text-mint transition-colors"
                                >
                                  YC Profile
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {company.Category && (
                            <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20">
                              {company.Category}
                            </Badge>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {[
                              company.Subcategory_1,
                              company.Subcategory_2,
                              company.Subcategory_3
                            ]
                              .filter(Boolean)
                              .slice(0, 3)
                              .map((sub, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs bg-muted/50"
                                >
                                  {sub}
                                </Badge>
                              ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-sm">
                          <p className="text-sm text-muted-foreground">
                            {company.Description}
                          </p>
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          <p className="text-sm text-muted-foreground">
                            {company.YC_OneLiner}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center">
                    {/* Previous button */}
                    <button
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </button>
                    
                    {/* Page numbers */}
                    {(() => {
                      const pages = [];
                      const maxVisible = 7; // Show max 7 page numbers
                      const showFirst = currentPage > 3;
                      const showLast = currentPage < totalPages - 2;
                      
                      if (totalPages <= maxVisible) {
                        // Show all pages if total is small
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i)}
                              className={`px-2 py-1 text-sm min-w-[28px] transition-colors ${
                                currentPage === i
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                      } else {
                        // Show condensed pagination
                        if (showFirst) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => setCurrentPage(1)}
                              className="px-2 py-1 text-sm min-w-[28px] hover:text-foreground transition-colors text-muted-foreground"
                            >
                              1
                            </button>
                          );
                          if (currentPage > 4) {
                            pages.push(
                              <span key="left-ellipsis" className="px-1 text-muted-foreground text-sm">
                                ...
                              </span>
                            );
                          }
                        }
                        
                        // Pages around current page
                        const startPage = Math.max(1, currentPage - 1);
                        const endPage = Math.min(totalPages, currentPage + 1);
                        
                        for (let i = startPage; i <= endPage; i++) {
                          if (!showFirst || i > 1) {
                            if (!showLast || i < totalPages) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(i)}
                                  className={`px-2 py-1 text-sm min-w-[28px] transition-colors ${
                                    currentPage === i
                                      ? "text-foreground font-medium"
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }
                          }
                        }
                        
                        if (showLast) {
                          if (currentPage < totalPages - 3) {
                            pages.push(
                              <span key="right-ellipsis" className="px-1 text-muted-foreground text-sm">
                                ...
                              </span>
                            );
                          }
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => setCurrentPage(totalPages)}
                              className="px-2 py-1 text-sm min-w-[28px] hover:text-foreground transition-colors text-muted-foreground"
                            >
                              {totalPages}
                            </button>
                          );
                        }
                      }
                      
                      return pages;
                    })()}
                    
                    {/* Next button */}
                    <button
                      onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}